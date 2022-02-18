import { defineConfig, mergeConfig, UserConfig } from 'vite'
import { withReact } from './react'
import { VitePluginFontsOptions } from 'vite-plugin-fonts'
import { VitePluginRadarOptions } from 'vite-plugin-radar'
import { VitePWAOptions } from 'vite-plugin-pwa'
import { ViteSentryPluginOptions } from 'vite-plugin-sentry'
import { withStaticHtml } from './static'

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
  fonts: Partial<VitePluginFontsOptions>
  analytics: Partial<VitePluginRadarOptions>
  pwa: Partial<VitePWAOptions>
  sentry: Partial<ViteSentryPluginOptions>
}

export type ConfigCallback = (plugins: Partial<ReactVitePlugins>) => ReturnType<typeof defineConfig>

export type ConfigMergeCallback = (config?: UserConfig, plugins?: Partial<ReactVitePlugins>) => ReturnType<typeof defineConfig>

const configureReact: ConfigMergeCallback = (config = {}, plugins = {}) => mergeConfig(withReact(plugins), config)
const configureStaticHtml: ConfigMergeCallback = (config = {}, plugins = {}) => mergeConfig(withStaticHtml(plugins), config)

export { configureReact as default, configureStaticHtml }
