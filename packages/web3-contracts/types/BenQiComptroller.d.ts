/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from 'bn.js'
import { ContractOptions } from 'web3-eth-contract'
import { EventLog } from 'web3-core'
import { EventEmitter } from 'events'
import {
    Callback,
    PayableTransactionObject,
    NonPayableTransactionObject,
    BlockType,
    ContractEventLog,
    BaseContract,
} from './types'

interface EventOptions {
    filter?: object
    fromBlock?: BlockType
    topics?: string[]
}

export type ActionPaused_string_bool = ContractEventLog<{
    action: string
    pauseState: boolean
    0: string
    1: boolean
}>
export type ActionPaused_address_string_bool = ContractEventLog<{
    qiToken: string
    action: string
    pauseState: boolean
    0: string
    1: string
    2: boolean
}>
export type ContributorQiSpeedUpdated = ContractEventLog<{
    contributor: string
    newSpeed: string
    0: string
    1: string
}>
export type DistributedBorrowerReward = ContractEventLog<{
    tokenType: string
    qiToken: string
    borrower: string
    qiDelta: string
    qiBorrowIndex: string
    0: string
    1: string
    2: string
    3: string
    4: string
}>
export type DistributedSupplierReward = ContractEventLog<{
    tokenType: string
    qiToken: string
    borrower: string
    qiDelta: string
    qiBorrowIndex: string
    0: string
    1: string
    2: string
    3: string
    4: string
}>
export type Failure = ContractEventLog<{
    error: string
    info: string
    detail: string
    0: string
    1: string
    2: string
}>
export type MarketEntered = ContractEventLog<{
    qiToken: string
    account: string
    0: string
    1: string
}>
export type MarketExited = ContractEventLog<{
    qiToken: string
    account: string
    0: string
    1: string
}>
export type MarketListed = ContractEventLog<{
    qiToken: string
    0: string
}>
export type NewBorrowCap = ContractEventLog<{
    qiToken: string
    newBorrowCap: string
    0: string
    1: string
}>
export type NewBorrowCapGuardian = ContractEventLog<{
    oldBorrowCapGuardian: string
    newBorrowCapGuardian: string
    0: string
    1: string
}>
export type NewCloseFactor = ContractEventLog<{
    oldCloseFactorMantissa: string
    newCloseFactorMantissa: string
    0: string
    1: string
}>
export type NewCollateralFactor = ContractEventLog<{
    qiToken: string
    oldCollateralFactorMantissa: string
    newCollateralFactorMantissa: string
    0: string
    1: string
    2: string
}>
export type NewLiquidationIncentive = ContractEventLog<{
    oldLiquidationIncentiveMantissa: string
    newLiquidationIncentiveMantissa: string
    0: string
    1: string
}>
export type NewPauseGuardian = ContractEventLog<{
    oldPauseGuardian: string
    newPauseGuardian: string
    0: string
    1: string
}>
export type NewPriceOracle = ContractEventLog<{
    oldPriceOracle: string
    newPriceOracle: string
    0: string
    1: string
}>
export type QiGranted = ContractEventLog<{
    recipient: string
    amount: string
    0: string
    1: string
}>
export type SpeedUpdated = ContractEventLog<{
    tokenType: string
    qiToken: string
    newSpeed: string
    0: string
    1: string
    2: string
}>

export interface BenQiComptroller extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): BenQiComptroller
    clone(): BenQiComptroller
    methods: {
        _become(unitroller: string): NonPayableTransactionObject<void>

        _borrowGuardianPaused(): NonPayableTransactionObject<boolean>

        _grantQi(recipient: string, amount: number | string | BN): NonPayableTransactionObject<void>

        _mintGuardianPaused(): NonPayableTransactionObject<boolean>

        _setBorrowCapGuardian(newBorrowCapGuardian: string): NonPayableTransactionObject<void>

        _setBorrowPaused(qiToken: string, state: boolean): NonPayableTransactionObject<boolean>

        _setCloseFactor(newCloseFactorMantissa: number | string | BN): NonPayableTransactionObject<string>

        _setCollateralFactor(
            qiToken: string,
            newCollateralFactorMantissa: number | string | BN,
        ): NonPayableTransactionObject<string>

        _setLiquidationIncentive(
            newLiquidationIncentiveMantissa: number | string | BN,
        ): NonPayableTransactionObject<string>

        _setMarketBorrowCaps(
            qiTokens: string[],
            newBorrowCaps: (number | string | BN)[],
        ): NonPayableTransactionObject<void>

        _setMintPaused(qiToken: string, state: boolean): NonPayableTransactionObject<boolean>

        _setPauseGuardian(newPauseGuardian: string): NonPayableTransactionObject<string>

        _setPriceOracle(newOracle: string): NonPayableTransactionObject<string>

        _setRewardSpeed(
            rewardType: number | string | BN,
            qiToken: string,
            rewardSpeed: number | string | BN,
        ): NonPayableTransactionObject<void>

        _setSeizePaused(state: boolean): NonPayableTransactionObject<boolean>

        _setTransferPaused(state: boolean): NonPayableTransactionObject<boolean>

        _supportMarket(qiToken: string): NonPayableTransactionObject<string>

        accountAssets(arg0: string, arg1: number | string | BN): NonPayableTransactionObject<string>

        admin(): NonPayableTransactionObject<string>

        allMarkets(arg0: number | string | BN): NonPayableTransactionObject<string>

        borrowAllowed(
            qiToken: string,
            borrower: string,
            borrowAmount: number | string | BN,
        ): NonPayableTransactionObject<string>

        borrowCapGuardian(): NonPayableTransactionObject<string>

        borrowCaps(arg0: string): NonPayableTransactionObject<string>

        borrowGuardianPaused(arg0: string): NonPayableTransactionObject<boolean>

        borrowVerify(
            qiToken: string,
            borrower: string,
            borrowAmount: number | string | BN,
        ): NonPayableTransactionObject<void>

        checkMembership(account: string, qiToken: string): NonPayableTransactionObject<boolean>

        'claimReward(uint8,address)'(
            rewardType: number | string | BN,
            holder: string,
        ): NonPayableTransactionObject<void>

        'claimReward(uint8,address,address[])'(
            rewardType: number | string | BN,
            holder: string,
            qiTokens: string[],
        ): NonPayableTransactionObject<void>

        'claimReward(uint8,address[],address[],bool,bool)'(
            rewardType: number | string | BN,
            holders: string[],
            qiTokens: string[],
            borrowers: boolean,
            suppliers: boolean,
        ): PayableTransactionObject<void>

        closeFactorMantissa(): NonPayableTransactionObject<string>

        comptrollerImplementation(): NonPayableTransactionObject<string>

        enterMarkets(qiTokens: string[]): NonPayableTransactionObject<string[]>

        exitMarket(qiTokenAddress: string): NonPayableTransactionObject<string>

        getAccountLiquidity(account: string): NonPayableTransactionObject<{
            0: string
            1: string
            2: string
        }>

        getAllMarkets(): NonPayableTransactionObject<string[]>

        getAssetsIn(account: string): NonPayableTransactionObject<string[]>

        getBlockTimestamp(): NonPayableTransactionObject<string>

        getHypotheticalAccountLiquidity(
            account: string,
            qiTokenModify: string,
            redeemTokens: number | string | BN,
            borrowAmount: number | string | BN,
        ): NonPayableTransactionObject<{
            0: string
            1: string
            2: string
        }>

        initialIndexConstant(): NonPayableTransactionObject<string>

        isComptroller(): NonPayableTransactionObject<boolean>

        liquidateBorrowAllowed(
            qiTokenBorrowed: string,
            qiTokenCollateral: string,
            liquidator: string,
            borrower: string,
            repayAmount: number | string | BN,
        ): NonPayableTransactionObject<string>

        liquidateBorrowVerify(
            qiTokenBorrowed: string,
            qiTokenCollateral: string,
            liquidator: string,
            borrower: string,
            actualRepayAmount: number | string | BN,
            seizeTokens: number | string | BN,
        ): NonPayableTransactionObject<void>

        liquidateCalculateSeizeTokens(
            qiTokenBorrowed: string,
            qiTokenCollateral: string,
            actualRepayAmount: number | string | BN,
        ): NonPayableTransactionObject<{
            0: string
            1: string
        }>

        liquidationIncentiveMantissa(): NonPayableTransactionObject<string>

        markets(arg0: string): NonPayableTransactionObject<{
            isListed: boolean
            collateralFactorMantissa: string
            isQied: boolean
            0: boolean
            1: string
            2: boolean
        }>

        maxAssets(): NonPayableTransactionObject<string>

        mintAllowed(
            qiToken: string,
            minter: string,
            mintAmount: number | string | BN,
        ): NonPayableTransactionObject<string>

        mintGuardianPaused(arg0: string): NonPayableTransactionObject<boolean>

        mintVerify(
            qiToken: string,
            minter: string,
            actualMintAmount: number | string | BN,
            mintTokens: number | string | BN,
        ): NonPayableTransactionObject<void>

        oracle(): NonPayableTransactionObject<string>

        pauseGuardian(): NonPayableTransactionObject<string>

        pendingAdmin(): NonPayableTransactionObject<string>

        pendingComptrollerImplementation(): NonPayableTransactionObject<string>

        qiAddress(): NonPayableTransactionObject<string>

        redeemAllowed(
            qiToken: string,
            redeemer: string,
            redeemTokens: number | string | BN,
        ): NonPayableTransactionObject<string>

        redeemVerify(
            qiToken: string,
            redeemer: string,
            redeemAmount: number | string | BN,
            redeemTokens: number | string | BN,
        ): NonPayableTransactionObject<void>

        repayBorrowAllowed(
            qiToken: string,
            payer: string,
            borrower: string,
            repayAmount: number | string | BN,
        ): NonPayableTransactionObject<string>

        repayBorrowVerify(
            qiToken: string,
            payer: string,
            borrower: string,
            actualRepayAmount: number | string | BN,
            borrowerIndex: number | string | BN,
        ): NonPayableTransactionObject<void>

        rewardAccrued(arg0: number | string | BN, arg1: string): NonPayableTransactionObject<string>

        rewardAvax(): NonPayableTransactionObject<string>

        rewardBorrowState(
            arg0: number | string | BN,
            arg1: string,
        ): NonPayableTransactionObject<{
            index: string
            timestamp: string
            0: string
            1: string
        }>

        rewardBorrowerIndex(arg0: number | string | BN, arg1: string, arg2: string): NonPayableTransactionObject<string>

        rewardQi(): NonPayableTransactionObject<string>

        supplyRewardSpeeds(arg0: number | string | BN, arg1: string): NonPayableTransactionObject<string>

        rewardSupplierIndex(arg0: number | string | BN, arg1: string, arg2: string): NonPayableTransactionObject<string>

        rewardSupplyState(
            arg0: number | string | BN,
            arg1: string,
        ): NonPayableTransactionObject<{
            index: string
            timestamp: string
            0: string
            1: string
        }>

        seizeAllowed(
            qiTokenCollateral: string,
            qiTokenBorrowed: string,
            liquidator: string,
            borrower: string,
            seizeTokens: number | string | BN,
        ): NonPayableTransactionObject<string>

        seizeGuardianPaused(): NonPayableTransactionObject<boolean>

        seizeVerify(
            qiTokenCollateral: string,
            qiTokenBorrowed: string,
            liquidator: string,
            borrower: string,
            seizeTokens: number | string | BN,
        ): NonPayableTransactionObject<void>

        setQiAddress(newQiAddress: string): NonPayableTransactionObject<void>

        transferAllowed(
            qiToken: string,
            src: string,
            dst: string,
            transferTokens: number | string | BN,
        ): NonPayableTransactionObject<string>

        transferGuardianPaused(): NonPayableTransactionObject<boolean>

        transferVerify(
            qiToken: string,
            src: string,
            dst: string,
            transferTokens: number | string | BN,
        ): NonPayableTransactionObject<void>
    }
    events: {
        'ActionPaused(string,bool)'(cb?: Callback<ActionPaused_string_bool>): EventEmitter
        'ActionPaused(string,bool)'(options?: EventOptions, cb?: Callback<ActionPaused_string_bool>): EventEmitter

        'ActionPaused(address,string,bool)'(cb?: Callback<ActionPaused_address_string_bool>): EventEmitter
        'ActionPaused(address,string,bool)'(
            options?: EventOptions,
            cb?: Callback<ActionPaused_address_string_bool>,
        ): EventEmitter

        ContributorQiSpeedUpdated(cb?: Callback<ContributorQiSpeedUpdated>): EventEmitter
        ContributorQiSpeedUpdated(options?: EventOptions, cb?: Callback<ContributorQiSpeedUpdated>): EventEmitter

        DistributedBorrowerReward(cb?: Callback<DistributedBorrowerReward>): EventEmitter
        DistributedBorrowerReward(options?: EventOptions, cb?: Callback<DistributedBorrowerReward>): EventEmitter

        DistributedSupplierReward(cb?: Callback<DistributedSupplierReward>): EventEmitter
        DistributedSupplierReward(options?: EventOptions, cb?: Callback<DistributedSupplierReward>): EventEmitter

        Failure(cb?: Callback<Failure>): EventEmitter
        Failure(options?: EventOptions, cb?: Callback<Failure>): EventEmitter

        MarketEntered(cb?: Callback<MarketEntered>): EventEmitter
        MarketEntered(options?: EventOptions, cb?: Callback<MarketEntered>): EventEmitter

        MarketExited(cb?: Callback<MarketExited>): EventEmitter
        MarketExited(options?: EventOptions, cb?: Callback<MarketExited>): EventEmitter

        MarketListed(cb?: Callback<MarketListed>): EventEmitter
        MarketListed(options?: EventOptions, cb?: Callback<MarketListed>): EventEmitter

        NewBorrowCap(cb?: Callback<NewBorrowCap>): EventEmitter
        NewBorrowCap(options?: EventOptions, cb?: Callback<NewBorrowCap>): EventEmitter

        NewBorrowCapGuardian(cb?: Callback<NewBorrowCapGuardian>): EventEmitter
        NewBorrowCapGuardian(options?: EventOptions, cb?: Callback<NewBorrowCapGuardian>): EventEmitter

        NewCloseFactor(cb?: Callback<NewCloseFactor>): EventEmitter
        NewCloseFactor(options?: EventOptions, cb?: Callback<NewCloseFactor>): EventEmitter

        NewCollateralFactor(cb?: Callback<NewCollateralFactor>): EventEmitter
        NewCollateralFactor(options?: EventOptions, cb?: Callback<NewCollateralFactor>): EventEmitter

        NewLiquidationIncentive(cb?: Callback<NewLiquidationIncentive>): EventEmitter
        NewLiquidationIncentive(options?: EventOptions, cb?: Callback<NewLiquidationIncentive>): EventEmitter

        NewPauseGuardian(cb?: Callback<NewPauseGuardian>): EventEmitter
        NewPauseGuardian(options?: EventOptions, cb?: Callback<NewPauseGuardian>): EventEmitter

        NewPriceOracle(cb?: Callback<NewPriceOracle>): EventEmitter
        NewPriceOracle(options?: EventOptions, cb?: Callback<NewPriceOracle>): EventEmitter

        QiGranted(cb?: Callback<QiGranted>): EventEmitter
        QiGranted(options?: EventOptions, cb?: Callback<QiGranted>): EventEmitter

        SpeedUpdated(cb?: Callback<SpeedUpdated>): EventEmitter
        SpeedUpdated(options?: EventOptions, cb?: Callback<SpeedUpdated>): EventEmitter

        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter
    }

    once(event: 'ContributorQiSpeedUpdated', cb: Callback<ContributorQiSpeedUpdated>): void
    once(event: 'ContributorQiSpeedUpdated', options: EventOptions, cb: Callback<ContributorQiSpeedUpdated>): void

    once(event: 'DistributedBorrowerReward', cb: Callback<DistributedBorrowerReward>): void
    once(event: 'DistributedBorrowerReward', options: EventOptions, cb: Callback<DistributedBorrowerReward>): void

    once(event: 'DistributedSupplierReward', cb: Callback<DistributedSupplierReward>): void
    once(event: 'DistributedSupplierReward', options: EventOptions, cb: Callback<DistributedSupplierReward>): void

    once(event: 'Failure', cb: Callback<Failure>): void
    once(event: 'Failure', options: EventOptions, cb: Callback<Failure>): void

    once(event: 'MarketEntered', cb: Callback<MarketEntered>): void
    once(event: 'MarketEntered', options: EventOptions, cb: Callback<MarketEntered>): void

    once(event: 'MarketExited', cb: Callback<MarketExited>): void
    once(event: 'MarketExited', options: EventOptions, cb: Callback<MarketExited>): void

    once(event: 'MarketListed', cb: Callback<MarketListed>): void
    once(event: 'MarketListed', options: EventOptions, cb: Callback<MarketListed>): void

    once(event: 'NewBorrowCap', cb: Callback<NewBorrowCap>): void
    once(event: 'NewBorrowCap', options: EventOptions, cb: Callback<NewBorrowCap>): void

    once(event: 'NewBorrowCapGuardian', cb: Callback<NewBorrowCapGuardian>): void
    once(event: 'NewBorrowCapGuardian', options: EventOptions, cb: Callback<NewBorrowCapGuardian>): void

    once(event: 'NewCloseFactor', cb: Callback<NewCloseFactor>): void
    once(event: 'NewCloseFactor', options: EventOptions, cb: Callback<NewCloseFactor>): void

    once(event: 'NewCollateralFactor', cb: Callback<NewCollateralFactor>): void
    once(event: 'NewCollateralFactor', options: EventOptions, cb: Callback<NewCollateralFactor>): void

    once(event: 'NewLiquidationIncentive', cb: Callback<NewLiquidationIncentive>): void
    once(event: 'NewLiquidationIncentive', options: EventOptions, cb: Callback<NewLiquidationIncentive>): void

    once(event: 'NewPauseGuardian', cb: Callback<NewPauseGuardian>): void
    once(event: 'NewPauseGuardian', options: EventOptions, cb: Callback<NewPauseGuardian>): void

    once(event: 'NewPriceOracle', cb: Callback<NewPriceOracle>): void
    once(event: 'NewPriceOracle', options: EventOptions, cb: Callback<NewPriceOracle>): void

    once(event: 'QiGranted', cb: Callback<QiGranted>): void
    once(event: 'QiGranted', options: EventOptions, cb: Callback<QiGranted>): void

    once(event: 'SpeedUpdated', cb: Callback<SpeedUpdated>): void
    once(event: 'SpeedUpdated', options: EventOptions, cb: Callback<SpeedUpdated>): void
}
