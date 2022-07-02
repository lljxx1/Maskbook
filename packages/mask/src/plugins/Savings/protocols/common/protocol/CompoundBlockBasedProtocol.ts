import type Web3 from 'web3'
import type { AbiItem } from 'web3-utils'
import BigNumber from 'bignumber.js'
import { ZERO } from '@masknet/web3-shared-base'
import { ChainId, createContract, TransactionEventType } from '@masknet/web3-shared-evm'
import { ProtocolType, SavingsProtocol, PairToken } from '../../../types'
import type { CERC20 } from '@masknet/web3-contracts/types/CERC20'
import type { CEther } from '@masknet/web3-contracts/types/CEther'
import CERC20ABI from '@masknet/web3-contracts/abis/CERC20.json'
import CEtherABI from '@masknet/web3-contracts/abis/CEther.json'

export const BLOCKS_PER_DAY = 6570
export const DAYS_PER_YEAR = 365

export default class CompoundBlockBasedProtocol implements SavingsProtocol {
    private DEFAULT_APR = '0.00'

    private _apr = '0.00'
    private _balance = ZERO

    constructor(readonly pair: PairToken, readonly nativeToken: string) {}

    get type() {
        return ProtocolType.Compound
    }

    get apr() {
        return this._apr
    }

    get balance() {
        return this._balance
    }

    get bareToken() {
        return this.pair[0]
    }

    get stakeToken() {
        return this.pair[1]
    }

    get isNativeToken() {
        return this.stakeToken.symbol === this.nativeToken
    }

    get approveAddress() {
        return this.stakeToken.address
    }

    public getPoolContract(web3: Web3) {
        const contract = this.isNativeToken
            ? createContract<CEther>(web3, this.stakeToken.address, CEtherABI as AbiItem[])
            : createContract<CERC20>(web3, this.stakeToken.address, CERC20ABI as AbiItem[])
        return contract
    }

    public async updateApr(chainId: ChainId, web3: Web3) {
        try {
            const contract = this.getPoolContract(web3)
            if (contract === null) {
                this._apr = this.DEFAULT_APR
                return
            }
            const supplyRate = await contract.methods.supplyRatePerBlock().call()
            const supplyBase = new BigNumber(supplyRate).times(BLOCKS_PER_DAY)
            const apy = supplyBase.times(DAYS_PER_YEAR).shiftedBy(-16)
            this._apr = apy.toFixed(2)
        } catch (error) {
            this._apr = this.DEFAULT_APR
        }
    }

    public async updateBalance(chainId: ChainId, web3: Web3, account: string) {
        try {
            const contract = this.getPoolContract(web3)
            if (contract === null) {
                this._balance = ZERO
                return
            }
            const balance = await contract.methods.balanceOfUnderlying(account).call()
            this._balance = new BigNumber(balance)
        } catch (error) {
            this._balance = ZERO
        }
    }

    public async depositEstimate(account: string, chainId: ChainId, web3: Web3, value: BigNumber.Value) {
        try {
            const operation = await this.createDepositTokenOperation(web3, value)
            const args = this.isNativeToken
                ? {
                      value: value.toString(),
                      from: account,
                  }
                : {
                      from: account,
                  }
            const gasEstimate = await operation?.estimateGas(args)
            return new BigNumber(gasEstimate || 0)
        } catch (error) {
            return ZERO
        }
    }

    private async createDepositTokenOperation(web3: Web3, value: BigNumber.Value) {
        const contract = this.getPoolContract(web3)
        if (this.isNativeToken) {
            return (contract as CEther)?.methods.mint()
        } else {
            return contract?.methods.mint(value.toString())
        }
    }

    public async deposit(account: string, chainId: ChainId, web3: Web3, value: BigNumber.Value) {
        const gasEstimate = await this.depositEstimate(account, chainId, web3, value)
        const operation = await this.createDepositTokenOperation(web3, value)
        const args = this.isNativeToken
            ? {
                  from: account,
                  value: value.toString(),
                  gas: gasEstimate.toNumber(),
              }
            : {
                  from: account,
                  gas: gasEstimate.toNumber(),
              }

        if (!operation) {
            throw new Error("Can't create deposit operation")
        }
        return new Promise<string>((resolve, reject) => {
            operation
                .send(args)
                .once(TransactionEventType.ERROR, reject)
                .once(TransactionEventType.CONFIRMATION, (_, receipt) => {
                    resolve(receipt.transactionHash)
                })
        })
    }

    public async withdrawEstimate(account: string, chainId: ChainId, web3: Web3, value: BigNumber.Value) {
        try {
            const contract = this.getPoolContract(web3)
            const operation = contract?.methods.redeemUnderlying(value.toString())
            const gasEstimate = await operation?.estimateGas({
                from: account,
            })
            return new BigNumber(gasEstimate || 0)
        } catch (error) {
            return ZERO
        }
    }

    public async withdraw(account: string, chainId: ChainId, web3: Web3, value: BigNumber.Value) {
        const gasEstimate = await this.withdrawEstimate(account, chainId, web3, value)
        const contract = this.getPoolContract(web3)
        return new Promise<string>((resolve) =>
            contract?.methods
                .redeemUnderlying(value.toString())
                .send({
                    from: account,
                    gas: gasEstimate.toNumber(),
                })
                .once(TransactionEventType.CONFIRMATION, (_, receipt) => {
                    resolve(receipt.transactionHash)
                }),
        )
    }
}