import { UserConfig } from 'vite'

import { envOptions } from './env'
import { commonPlugins } from './plugins'
import { serverOptions } from './server'
import { cssOptions } from './styles'

type CommonOptions = Partial<UserConfig>
/**
 * @param {PluginOptions} options
 * @param {CommonOptions} config
 */
const commonOptions = (
  options: CommonOptions = { plugins: [] },
  config: Partial<PluginOptions> = {}
): CommonOptions => {
  const { plugins, css, server } = options
  return {
    plugins: commonPlugins(config).concat(plugins),
    ...serverOptions(server),
    ...cssOptions(css),
    ...envOptions(),
  }
}

export { commonOptions }
