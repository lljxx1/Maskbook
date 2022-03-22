import { OpenSeaPort } from 'opensea-js'
import { ChainId, createExternalProvider } from '@masknet/web3-shared-evm'
import { request } from '../../../extension/background-script/EthereumService'
import { resolveOpenSeaNetwork } from '../pipes'
import { OpenSeaAPI_Key, ReferrerAddress } from '../constants'
import { createLookupTableResolver } from '@masknet/web3-shared-base'

const resolveOpenSeaBaseURL = createLookupTableResolver<ChainId.Mainnet | ChainId.Rinkeby, string>(
    {
        [ChainId.Mainnet]: 'https://api.opensea.io',
        [ChainId.Rinkeby]: 'https://testnets-api.opensea.io',
    },
    '',
)

function createOpenSeaPortChain(chainId: ChainId.Mainnet | ChainId.Rinkeby) {
    return new OpenSeaPort(
        createExternalProvider(request),
        {
            networkName: resolveOpenSeaNetwork(chainId),
            // apiKey: OpenSeaAPI_Key,
            apiBaseUrl: `https://cors.r2d2.to/?${resolveOpenSeaBaseURL(chainId)}`,
        },
        console.log,
    )
}

function createOpenSeaPort(chainId?: ChainId) {
    return createOpenSeaPortChain(chainId === ChainId.Rinkeby ? ChainId.Rinkeby : ChainId.Mainnet)
}

export async function getAssetFromSDK(tokenAddress: string, tokenId: string) {
    return createOpenSeaPort().api.getAsset({ tokenAddress, tokenId })
}

export async function createBuyOrder(payload: Parameters<OpenSeaPort['createBuyOrder']>[0]) {
    return createOpenSeaPort().createBuyOrder({
        referrerAddress: ReferrerAddress,
        ...payload,
    })
}

export async function createSellOrder(payload: Parameters<OpenSeaPort['createSellOrder']>[0]) {
    return createOpenSeaPort().createSellOrder(payload)
}

export async function fulfillOrder(payload: Parameters<OpenSeaPort['fulfillOrder']>[0]) {
    return createOpenSeaPort().fulfillOrder({
        referrerAddress: ReferrerAddress,
        ...payload,
    })
}
