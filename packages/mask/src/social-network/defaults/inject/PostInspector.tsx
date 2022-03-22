import { memo } from 'react'
import { noop } from 'lodash-unified'
import { makeStyles } from '@masknet/theme'
import { EMPTY_OBJECT } from '@masknet/shared-base'
import type { DOMProxy } from '@dimensiondev/holoflows-kit'
import type { PostInfo } from '../../PostInfo'
import { createReactRootShadowed } from '../../../utils/shadow-root/renderInShadowRoot'
import { PostInspector, PostInspectorProps } from '../../../components/InjectedComponents/PostInspector'
import { PostInfoProvider } from '../../../components/DataSource/usePostInfo'

export function injectPostInspectorDefault<T extends string>(
    config: InjectPostInspectorDefaultConfig = {},
    additionalPropsToPostInspector: (classes: Record<T, string>) => Partial<PostInspectorProps> = () => EMPTY_OBJECT,
    useCustomStyles: (props?: any) => { classes: Record<T, string> } = makeStyles()(EMPTY_OBJECT) as any,
) {
    const PostInspectorDefault = memo(
        function PostInspectorDefault(props: {
            onDecrypted: PostInspectorProps['onDecrypted']
            zipPost: PostInspectorProps['needZip']
        }) {
            const { onDecrypted, zipPost } = props
            const { classes } = useCustomStyles()
            const additionalProps = additionalPropsToPostInspector(classes)
            return <PostInspector onDecrypted={onDecrypted} needZip={zipPost} {...additionalProps} />
        },
        (a, b) => {
            console.log('DEBUG: comparesion')
            console.log({
                a,
                b,
            })
            return false
        },
    )

    const { zipPost = noop, injectionPoint } = config
    return function injectPostInspector(current: PostInfo, signal: AbortSignal) {
        console.log('DEBUG: injectPostInspector')

        const root = createReactRootShadowed(injectionPoint?.(current) ?? current.rootElement.afterShadow, {
            key: 'post-inspector',
            signal,
        })
        root.render(
            <PostInfoProvider post={current}>
                <PostInspectorDefault
                    onDecrypted={(typed) => {
                        current.rawMessagePiped.value = typed
                    }}
                    zipPost={() => zipPost(current.rootElement)}
                    {...current}
                />
            </PostInfoProvider>,
        )
        return () => {
            console.log('DEBUG: destroy!')
            root.destroy()
        }
    }
}

interface InjectPostInspectorDefaultConfig {
    zipPost?(node: DOMProxy): void
    injectionPoint?: (postInfo: PostInfo) => ShadowRoot
}
