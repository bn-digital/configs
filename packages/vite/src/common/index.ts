import { serverOptions } from './server'
import { cssOptions } from './styles'
import { pathsOptions } from './paths'
import { VitePluginFontsOptions } from 'vite-plugin-fonts'
import { VitePluginRadarOptions } from 'vite-plugin-radar'
import { VitePWAOptions } from 'vite-plugin-pwa'
import { ViteSentryPluginOptions } from 'vite-plugin-sentry'
import { UserConfig } from 'vite'
import { envOptions } from './env'
import { commonPlugins } from './plugins'

export interface VitePluginOptions {
  fonts: Partial<VitePluginFontsOptions>
  analytics: Partial<VitePluginRadarOptions>
  pwa: Partial<VitePWAOptions>
  sentry: Partial<ViteSentryPluginOptions>
}

type CommonOptions = Partial<Pick<UserConfig, 'server' | 'plugins' | 'define' | 'envPrefix' | 'root' | 'envDir' | 'base' | 'css'>>

const commonOptions = (options: CommonOptions = {}, config: Partial<VitePluginOptions> = {}): CommonOptions => {
  const { css, base, server, define, envPrefix, envDir, root } = options
  const plugins = commonPlugins(config)
  options.plugins?.forEach(it => plugins.push(it))
  return {
    plugins,
    ...serverOptions({ server }),
    ...cssOptions({ css }),
    ...envOptions({ define, envDir, envPrefix }),
    ...pathsOptions({ base, root }),
  }
}

export { commonOptions }
