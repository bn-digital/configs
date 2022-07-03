import { UserConfig } from 'vite'

import { envOptions } from './env'
import { pathsOptions } from './paths'
import { commonPlugins } from './plugins'
import { serverOptions } from './server'
import { cssOptions } from './styles'

type CommonOptions = Partial<Pick<UserConfig, 'server' | 'plugins' | 'define' | 'envPrefix' | 'root' | 'envDir' | 'base' | 'css'>>
/**
 * @param {PluginOptions} options
 * @param {CommonOptions} config
 */
const commonOptions = (options: CommonOptions = { plugins: [] }, config: Partial<PluginOptions> = {}): CommonOptions => {
  const { plugins, css, server } = options
  return {
    plugins: commonPlugins(config).concat(plugins),
    ...serverOptions({ server }),
    ...cssOptions(css),
    ...envOptions(),
    ...pathsOptions(),
  }
}

export { commonOptions }
