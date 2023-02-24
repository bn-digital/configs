import { mergeConfig, UserConfig } from 'vite'

import { withReact } from './react'

function configureReact(config: UserConfig, plugins: PluginOptions) {
  return mergeConfig(config, withReact(plugins))
}

export { configureReact, configureReact as default }
