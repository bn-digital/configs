/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

export declare global {
  import { type UserConfigExport } from 'vite'
  import { type PluginOption, type UserConfig } from 'vite'
  import { UserPluginConfig } from 'vite-plugin-checker/dist/esm/types'
  import type { VitePluginFontsOptions } from 'vite-plugin-fonts'
  import type { VitePWAOptions } from 'vite-plugin-pwa'
  import type { VitePluginRadarOptions } from 'vite-plugin-radar'

  type EnvVariableName = `WEBSITE_${string}` | `APP_${string}`

  interface ImportMetaEnv {
    [key: EnvVariableName]: string | number | boolean | null | undefined
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

  type NodeEnv = 'development' | 'production'
  type AppEnv = NodeEnv | 'staging'
  type Enablement = { enabled: boolean }

  type PluginOptions = {
    mode: AppEnv
    analytics: Partial<VitePluginRadarOptions>
    fonts: Partial<VitePluginFontsOptions>
    lint: Partial<Enablement & UserPluginConfig>
    pwa: Partial<VitePWAOptions>
    graphql: Partial<Enablement & VitePWAOptions>
    react: Partial<ReactOptions>
  }

  type ReactOptions = {
    swc: boolean
  }

  type Plugins = (PluginOption | PluginOption[])[]
}
