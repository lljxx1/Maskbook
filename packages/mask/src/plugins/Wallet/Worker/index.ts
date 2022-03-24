import type { Plugin } from '@masknet/plugin-infra'
import { base, MaskMessages } from '@masknet/plugin-wallet'
import '../messages'
import { isLocked } from '../services'

const worker: Plugin.Worker.Definition = {
    ...base,
    init(signal) {
        MaskMessages.events.wallet_is_locked.on(
            async ([type]) => {
                if (type === 'request') {
                    MaskMessages.events.wallet_is_locked.sendToLocal(['response', await isLocked()])
                }
            },
            { signal },
        )
    },
}
export default worker
