import { type PluginOption, type UserConfig, defineConfig, mergeConfig } from 'vite'
import { UserPluginConfig } from 'vite-plugin-checker/dist/esm/types'
import type { VitePluginFontsOptions } from 'vite-plugin-fonts'
import type { VitePWAOptions } from 'vite-plugin-pwa'
import type { VitePluginRadarOptions } from 'vite-plugin-radar'

import { withReact } from './react'

declare global {
  type EnvVariableName = `WEBSITE_${string}`

  interface ImportMetaEnv {
    [key: EnvVariableName]: string | number | boolean | null | undefined
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

  type PluginOptions = Pick<UserConfig, 'mode'> & {
    analytics: Partial<VitePluginRadarOptions>
    fonts: Partial<VitePluginFontsOptions>
    lint: { enabled: boolean } & Partial<UserPluginConfig>
    pwa: Partial<VitePWAOptions>
    react: Partial<ReactOptions>
  }

  type ReactOptions = {
    graphql: boolean
    swc: boolean
  }

  type Plugins = (PluginOption | PluginOption[])[]

  type ConfigCallback = (plugins: Partial<PluginOptions>) => ReturnType<typeof defineConfig>

  type ConfigMergeCallback = (config?: UserConfig, plugins?: Partial<PluginOptions>) => ReturnType<typeof defineConfig>
}

const configureReact: ConfigMergeCallback = (config = {}, plugins = { lint: { enabled: true } }) =>
  mergeConfig(withReact(plugins), config)

export { configureReact, configureReact as default }
