import { PluginId } from '@masknet/plugin-infra'
import { BindingProof, EMPTY_LIST, NextIDPlatform, NextIDStorageInfo, ProfileIdentifier } from '@masknet/shared-base'
import { NextIDProof } from '@masknet/web3-providers'
import { first, uniq } from 'lodash-unified'
import { useEffect, useMemo } from 'react'
import { useAsync, useAsyncFn } from 'react-use'
import { MaskMessages } from '../../../utils'
import { useKvGet } from './useKv'
import { useProfilePublicKey } from './useProfilePublicKey'

export function usePublicWallets(profile: ProfileIdentifier | undefined) {
    const publicKey = useProfilePublicKey(profile)
    const { value: kv } = useKvGet<NextIDStorageInfo<BindingProof[]>>(publicKey)
    const [NextIDWalletsState, queryWallets] = useAsyncFn(async () => {
        if (!publicKey) return EMPTY_LIST

        const bindings = await NextIDProof.queryExistedBindingByPersona(publicKey, true)
        if (!bindings) return EMPTY_LIST

        const wallets = bindings.proofs.filter((p) => p.platform === NextIDPlatform.Ethereum).map((p) => p.identity)
        return wallets
    }, [publicKey])
    useAsync(queryWallets, [queryWallets])

    const walletsFromCloud = useMemo(() => {
        if (!kv?.ok) return null
        const { proofs } = kv.val
        if (!proofs.length) return null
        const configuredTipsWallets = proofs.some((x) => x.content[PluginId.Tips])
        if (!configuredTipsWallets) return null

        const tipWallets = first(
            proofs.map((x) => x.content[PluginId.Tips]?.filter((y) => y.platform === NextIDPlatform.Ethereum)),
        )
        if (!tipWallets) return null
        return tipWallets
            .filter((x) => {
                if (NextIDWalletsState.value) {
                    // Sometimes, the wallet might get deleted from next.id
                    return x.isPublic && NextIDWalletsState.value.includes(x.identity)
                } else {
                    return x.isPublic
                }
            })
            .map((x) => x.identity)
    }, [kv, NextIDWalletsState.value])

    useEffect(() => {
        return MaskMessages.events.ownProofChanged.on(() => {
            queryWallets()
        })
    }, [])

    return useMemo(() => {
        // If user configured wallets for tips, it couldn't be null.
        return walletsFromCloud || uniq(NextIDWalletsState.value || [])
    }, [NextIDWalletsState.value, walletsFromCloud])
}
