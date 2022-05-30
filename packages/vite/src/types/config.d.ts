import { defineConfig, PluginOption, UserConfig } from 'vite'
import { VitePluginFontsOptions } from 'vite-plugin-fonts'
import { VitePWAOptions } from 'vite-plugin-pwa'
import { VitePluginRadarOptions } from 'vite-plugin-radar'
import { ViteSentryPluginOptions } from 'vite-plugin-sentry'

type Browsers = `safari${number}` | `opera${number}` | `chrome${number}` | `edge${number}` | `ios${number}` | `ie${number}`

namespace Vite {
  type PluginOptions = {
    fonts: Partial<VitePluginFontsOptions>
    analytics: Partial<VitePluginRadarOptions>
    pwa: Partial<VitePWAOptions>
    sentry: Partial<ViteSentryPluginOptions>
    browsers: Browsers[]
    sourceMaps: boolean
    react: Partial<ReactOptions>
  }

  type ReactOptions = {
    antd: boolean
  }

  type Plugins = (PluginOption | PluginOption[])[]

  type ConfigCallback = (plugins: Partial<Vite.PluginOptions>) => ReturnType<typeof defineConfig>

  type ConfigMergeCallback = (config?: UserConfig, plugins?: Partial<Vite.PluginOptions>) => ReturnType<typeof defineConfig>
}

export { Vite as default }
