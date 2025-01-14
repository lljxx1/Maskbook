import { useCallback, useEffect, useState } from 'react'
import { makeStyles } from '@masknet/theme'
import { DialogContent } from '@mui/material'
import { openWindow, useRemoteControlledDialog, useValueRef } from '@masknet/shared-base-ui'
import { InjectedDialog } from '@masknet/shared'
import {
    getRegisteredWeb3Networks,
    getRegisteredWeb3Providers,
    useNetworkDescriptor,
    useWeb3State,
    useWeb3UI,
    Web3Helper,
} from '@masknet/plugin-infra/web3'
import { useI18N } from '../../../../utils/i18n-next-ui'
import { WalletMessages } from '../../messages'
import { hasNativeAPI, nativeAPI } from '../../../../../shared/native-rpc'
import { PluginProviderRender } from './PluginProviderRender'
import { pluginIDSettings } from '../../../../settings/settings'
import { getSiteType, isDashboardPage } from '@masknet/shared-base'
import { NetworkPluginID } from '@masknet/web3-shared-base'

const useStyles = makeStyles()((theme) => ({
    content: {
        padding: theme.spacing(0, 0, 1, 0),
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
}))

export interface SelectProviderDialogProps {}

export function SelectProviderDialog(props: SelectProviderDialogProps) {
    const { t } = useI18N()
    const { classes } = useStyles()
    const [walletConnectedCallback, setWalletConnectedCallback] = useState<(() => void) | undefined>()
    // #region remote controlled dialog logic
    const { open, closeDialog } = useRemoteControlledDialog(WalletMessages.events.selectProviderDialogUpdated, (ev) => {
        if (!ev.open) return
        setWalletConnectedCallback(() => ev.walletConnectedCallback)
    })
    const { setDialog: setConnectWalletDialog } = useRemoteControlledDialog(
        WalletMessages.events.connectWalletDialogUpdated,
    )
    // #endregion

    // #region native app
    useEffect(() => {
        if (!open) return
        if (hasNativeAPI) nativeAPI?.api.misc_openCreateWalletView()
    }, [open])
    // #endregion

    const site = getSiteType()
    const networks = getRegisteredWeb3Networks()
    const providers = getRegisteredWeb3Providers()
    const pluginIDs = useValueRef(pluginIDSettings)
    const network = useNetworkDescriptor()
    const [undeterminedPluginID, setUndeterminedPluginID] = useState(site ? pluginIDs[site] : undefined)
    const [undeterminedNetworkID, setUndeterminedNetworkID] = useState(network?.ID)

    const Web3State = useWeb3State(undeterminedPluginID)
    const { Others, Provider } = Web3State

    const { NetworkIconClickBait, ProviderIconClickBait } = useWeb3UI(undeterminedPluginID).SelectProviderDialog ?? {}

    const onNetworkIconClicked = useCallback((network: Web3Helper.NetworkDescriptorAll) => {
        setUndeterminedPluginID(network.networkSupporterPluginID)
        setUndeterminedNetworkID(network.ID)
    }, [])

    const onProviderIconClicked = useCallback(
        async (network: Web3Helper.NetworkDescriptorAll, provider: Web3Helper.ProviderDescriptorAll) => {
            if (!Provider?.isReady(provider.type)) {
                const downloadLink = Others?.providerResolver.providerDownloadLink(provider.type)
                if (downloadLink) openWindow(downloadLink)
                return
            }

            closeDialog()

            // TODO:
            // refactor to use react-router-dom
            setConnectWalletDialog({
                open: true,
                network,
                provider,
                walletConnectedCallback,
            })
        },
        [Others, Provider, closeDialog, walletConnectedCallback],
    )

    // not available for the native app
    if (hasNativeAPI) return null

    return (
        <InjectedDialog title={t('plugin_wallet_select_provider_dialog_title')} open={open} onClose={closeDialog}>
            <DialogContent className={classes.content}>
                <PluginProviderRender
                    networks={
                        isDashboardPage()
                            ? networks.filter((x) => x.networkSupporterPluginID === NetworkPluginID.PLUGIN_EVM)
                            : networks
                    }
                    providers={
                        isDashboardPage()
                            ? providers.filter((x) => x.providerAdaptorPluginID === NetworkPluginID.PLUGIN_EVM)
                            : providers
                    }
                    undeterminedPluginID={undeterminedPluginID}
                    undeterminedNetworkID={undeterminedNetworkID}
                    onNetworkIconClicked={onNetworkIconClicked}
                    onProviderIconClicked={onProviderIconClicked}
                    NetworkIconClickBait={NetworkIconClickBait}
                    ProviderIconClickBait={ProviderIconClickBait}
                />
            </DialogContent>
        </InjectedDialog>
    )
}
