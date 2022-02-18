import fs from 'fs'
import path from 'path'
import { default as analyticsPlugin, VitePluginRadarOptions } from 'vite-plugin-radar'
import sentryPlugin, { ViteSentryPluginOptions } from 'vite-plugin-sentry'
import fontsPlugin from 'vite-plugin-fonts'
import { VitePWA as pwaPlugin, VitePWAOptions } from 'vite-plugin-pwa'
import { PluginOption } from 'vite'
import legacyPlugin from '@vitejs/plugin-legacy'
import { imagetools as imageToolsPlugin } from 'vite-imagetools'
import tsConfigPathsPlugin from 'vite-tsconfig-paths'
import { VitePluginOptions } from './index'

function readPackageJson(workingDir = ''): { name: string; homepage?: string; proxy?: string; description: string } {
  return JSON.parse(fs.readFileSync(path.join(workingDir ?? process.cwd(), 'package.json'), 'utf-8'))
}

function resolveAnalyticsOptions(extraOptions?: Partial<VitePluginRadarOptions>): Partial<VitePluginRadarOptions> {
  return {
    analytics: process.env.GOOGLE_ANALYTICS_ID ? { id: process.env.GOOGLE_ANALYTICS_ID } : undefined,
    gtm: process.env.GOOGLE_TAG_MANAGER_ID ? { id: process.env.GOOGLE_TAG_MANAGER_ID } : undefined,
    ...extraOptions,
  }
}

function resolvePWAOptions(extraOptions?: Partial<VitePWAOptions>): Partial<VitePWAOptions> {
  return {
    mode: 'production',
    injectRegister: 'auto',
    minify: true,
    ...extraOptions,
  }
}

function resolveSentryOptions(extraOptions?: Partial<ViteSentryPluginOptions> & { project: string }): ViteSentryPluginOptions | null {
  if (process.env.SENTRY_ORGANIZATION && process.env.SENTRY_AUTH_TOKEN && extraOptions?.project) {
    return {
      url: process.env.SENTRY_URL,
      org: process.env.SENTRY_ORGANIZATION,
      deploy: { env: process.env.SENTRY_ENV ?? 'production' },
      release: process.env.GITHUB_SHA,
      setCommits: { auto: true },
      skipEnvironmentCheck: false,
      sourceMaps: { include: ['build'] },
      authToken: process.env.SENTRY_AUTH_TOKEN,
      ...extraOptions,
    }
  }
  return null
}

function commonPlugins(options: Partial<VitePluginOptions> = {}): (PluginOption | PluginOption[])[] {
  const packageJson = readPackageJson()

  const plugins: PluginOption[] = [
    legacyPlugin({
      targets: ['defaults', 'not IE 11'],
      polyfills: true,
    }),
    tsConfigPathsPlugin(),
    imageToolsPlugin({ removeMetadata: true }),
  ]

  const fontsOptions = options?.fonts
  fontsOptions && plugins.push(fontsPlugin(fontsOptions))

  const analyticsOptions = options?.analytics && resolveAnalyticsOptions(options.analytics)
  analyticsOptions && plugins.push(analyticsPlugin(analyticsOptions))

  const pwaOptions =
    options?.pwa &&
    resolvePWAOptions({
      ...options?.pwa,
      manifest: { name: packageJson.name, short_name: packageJson.name, ...options?.pwa?.manifest },
    })
  pwaOptions && pwaPlugin(pwaOptions).forEach(it => plugins.push(it))

  const sentryOptions =
    options?.sentry &&
    resolveSentryOptions({
      project: packageJson.name,
      ...options.sentry,
    })
  sentryOptions && plugins.push(sentryPlugin(sentryOptions))
  return plugins
}

export {readPackageJson, commonPlugins }
