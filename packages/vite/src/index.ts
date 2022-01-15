import {mergeConfig, UserConfig} from 'vite'
import {withReact} from './react/config'
import {VitePluginFontsOptions} from 'vite-plugin-fonts'
import {VitePluginRadarOptions} from 'vite-plugin-radar'
import {VitePWAOptions} from 'vite-plugin-pwa'
import {ViteSentryPluginOptions} from 'vite-plugin-sentry'

type EnvVariableName = `WEBSITE_${string}`

export interface ProcessEnv {
  [key: EnvVariableName]: string | number | boolean
}

export interface AppEnv extends ImportMetaEnv {
  readonly WEBSITE_MARKER_ID: string
}

export interface ImportMeta<T = AppEnv> {
  readonly env: T
}

export interface ReactVitePlugins {
  fonts?: Partial<VitePluginFontsOptions>
  analytics?: Partial<VitePluginRadarOptions>
  pwa?: Partial<VitePWAOptions>
  sentry?: Partial<ViteSentryPluginOptions>
}

export default (config: UserConfig = {}, plugins?: ReactVitePlugins) => mergeConfig(withReact(plugins), config)
