// Define new task at packages/mask/background/tasks/setup.hmr.ts if possible.
import * as PluginWorker from './StartPluginWorker'
import * as SettingListeners from './SettingListeners'

type CancelableJob = { default: (signal: AbortSignal) => void }
const CancelableJobs: CancelableJob[] = [PluginWorker, SettingListeners]

const abort = new AbortController()
CancelableJobs.map((x) => x.default(abort.signal))
if (import.meta.webpackHot) {
    import.meta.webpackHot.dispose(() => abort.abort())
    import.meta.webpackHot.accept()
}
