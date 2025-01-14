import type { EnhanceableSite } from '@masknet/shared-base'
import { NetworkPluginID } from '@masknet/web3-shared-base'
import { useAsyncRetry } from 'react-use'
import { activatedSocialNetworkUI } from '../../../social-network'
import type { RSS3_KEY_SNS } from '../constants'
import { getNFTAvatarByUserId } from '../utils'
import { useGetNFTAvatar } from './useGetNFTAvatar'

export function usePersonaNFTAvatar(userId: string, avatarId: string, snsKey: RSS3_KEY_SNS) {
    const [, getNFTAvatar] = useGetNFTAvatar()
    return useAsyncRetry(async () => {
        const avatarMetaFromPersona = await getNFTAvatarByUserId(userId, avatarId)
        if (avatarMetaFromPersona) return avatarMetaFromPersona
        const avatarMeta = await getNFTAvatar(
            userId,
            activatedSocialNetworkUI.networkIdentifier as EnhanceableSite,
            snsKey,
        )
        if (!avatarMeta) return
        if (avatarMeta.pluginId === NetworkPluginID.PLUGIN_SOLANA) {
            return { imageUrl: '', nickname: '', ...avatarMeta, address: avatarMeta.tokenId }
        }
        return { imageUrl: '', nickname: '', ...avatarMeta }
    }, [userId, getNFTAvatar, avatarId, snsKey])
}
