import type { Plugin } from '@masknet/plugin-infra'
import { base } from '../base'
import { BuyTokenDialog } from './BuyTokenDialog'
import { PluginTransakMessages } from '../messages'
import { useRemoteControlledDialog } from '@masknet/shared-base-ui'
import { ApplicationEntry } from '@masknet/shared'

const sns: Plugin.SNSAdaptor.Definition = {
    ...base,
    init(signal) {},
    GlobalInjection() {
        return <BuyTokenDialog />
    },
    ApplicationEntries: [
        {
            RenderEntryComponent(key) {
                const { openDialog } = useRemoteControlledDialog(PluginTransakMessages.buyTokenDialogUpdated)

                return (
                    <div key={key}>
                        <ApplicationEntry
                            title="Fiat On-Ramp"
                            icon={new URL('../assets/fiat_ramp.png', import.meta.url).toString()}
                            onClick={openDialog}
                        />
                    </div>
                )
            },
            defaultSortingPriority: 9,
        },
    ],
}

export default sns
