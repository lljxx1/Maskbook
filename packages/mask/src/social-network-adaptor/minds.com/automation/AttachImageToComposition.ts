import type { SocialNetworkUI } from '../../../social-network'
import { MaskMessages } from '@masknet/plugin-wallet'
import { downloadUrl } from '../../../utils/utils'
import { composerModalTextAreaSelector, composerPreviewSelector } from '../utils/selector'
import { pasteTextToCompositionMinds } from './pasteTextToComposition'

const hasSucceed = () => composerPreviewSelector().evaluate()

export function pasteImageToCompositionMinds() {
    return async function (
        url: string | Blob,
        { recover, relatedTextPayload }: SocialNetworkUI.AutomationCapabilities.NativeCompositionAttachImageOptions,
    ) {
        const image = typeof url === 'string' ? await downloadUrl(url) : url
        const data = [new ClipboardItem({ [image.type]: image })]

        pasteTextToCompositionMinds!(relatedTextPayload || '', { recover: false })

        await navigator.clipboard.write(data)
        composerModalTextAreaSelector().evaluate()?.focus()
        document.execCommand('paste')

        if (hasSucceed()) {
            // clear clipboard
            return navigator.clipboard.writeText('')
        } else if (recover) {
            MaskMessages.events.autoPasteFailed.sendToLocal({ text: relatedTextPayload || '', image })
        }
    }
}
