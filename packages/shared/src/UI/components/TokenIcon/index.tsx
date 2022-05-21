import { memo } from 'react'
import {
    ChainId,
    currySameAddress,
    formatEthereumAddress,
    getChainDetailed,
    getTokenConstants,
    isSameAddress,
    useChainId,
    useTokenAssetBaseURLConstants,
} from '@masknet/web3-shared-evm'
import { Avatar, AvatarProps } from '@mui/material'
import { makeStyles, useStylesExtends } from '@masknet/theme'
import { useImageFailOver } from '../../hooks'
import SPECIAL_ICON_LIST from './TokenIconSpecialIconList.json'
import NO_IMAGE_COLOR from './constants'

function getFallbackIcons(address: string, baseURIs: string[]) {
    const checkSummedAddress = formatEthereumAddress(address)

    if (isSameAddress(getTokenConstants().NATIVE_TOKEN_ADDRESS, checkSummedAddress)) {
        return baseURIs.map((x) => `${x}/info/logo.png`)
    }

    const specialIcon = SPECIAL_ICON_LIST.find(currySameAddress(address))
    if (specialIcon) return [specialIcon.logo_url]

    // load from remote
    return baseURIs.map((x) => `${x}/assets/${checkSummedAddress}/logo.png`)
}
const useStyles = makeStyles()((theme) => ({
    icon: {
        backgroundColor: theme.palette.common.white,
        margin: 0,
    },
}))

export interface TokenIconProps extends withClasses<'icon'> {
    name?: string
    logoURI?: string | string[]
    chainId?: ChainId
    address: string
    AvatarProps?: Partial<AvatarProps>
}

export function TokenIcon(props: TokenIconProps) {
    const currentChainId = useChainId()
    const { address, logoURI, name, chainId = currentChainId, AvatarProps, classes } = props
    let _logoURI = logoURI

    if (!logoURI && isSameAddress(getTokenConstants().NATIVE_TOKEN_ADDRESS, formatEthereumAddress(address))) {
        const nativeToken = getChainDetailed(chainId)
        _logoURI = nativeToken?.nativeCurrency.logoURI
    }

    const { TOKEN_ASSET_BASE_URI } = useTokenAssetBaseURLConstants(chainId)
    const fallbackLogos = getFallbackIcons(address, TOKEN_ASSET_BASE_URI ?? [])

    const images = _logoURI
        ? Array.isArray(_logoURI)
            ? [..._logoURI, ...fallbackLogos]
            : [_logoURI, ...fallbackLogos]
        : fallbackLogos
    const { value: trustedLogoURI, loading } = useImageFailOver(images, '')

    return (
        <TokenIconUI
            logoURL={loading ? undefined : trustedLogoURI}
            AvatarProps={AvatarProps}
            classes={classes}
            name={name}
        />
    )
}

export interface TokenIconUIProps extends withClasses<'icon'> {
    logoURL?: string
    AvatarProps?: Partial<AvatarProps>
    name?: string
}

export const TokenIconUI = memo<TokenIconUIProps>((props) => {
    const { logoURL, AvatarProps, name } = props

    // add background color to no-img token icon
    const defaultBackgroundColorNumber = name?.split('')?.reduce((total, cur) => total + Number(cur?.charCodeAt(0)), 0)
    const defaultBackgroundColor = defaultBackgroundColorNumber
        ? NO_IMAGE_COLOR?.[defaultBackgroundColorNumber % 5]
        : undefined
    const classes = useStylesExtends(useStyles(), props)

    return (
        <Avatar
            className={classes.icon}
            src={logoURL}
            style={{ backgroundColor: logoURL ? undefined : defaultBackgroundColor }}
            {...AvatarProps}>
            {name?.slice(0, 1).toUpperCase()}
        </Avatar>
    )
})
