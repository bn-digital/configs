import fs from 'fs'
import path from 'path'
import { imagetools as imageToolsPlugin } from 'vite-imagetools'
import { default as checkPlugin } from 'vite-plugin-checker'
import { default as fontsPlugin } from 'vite-plugin-fonts'
import { VitePWA as pwaPlugin, VitePWAOptions } from 'vite-plugin-pwa'
import { default as analyticsPlugin, VitePluginRadarOptions } from 'vite-plugin-radar'
import { default as sentryPlugin, ViteSentryPluginOptions } from 'vite-plugin-sentry'
import { default as tsConfigPathsPlugin } from 'vite-tsconfig-paths'

type TsConfigPathOptions = { root?: string }

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

function resolveTsConfigPathOptions(extraOptions?: TsConfigPathOptions): TsConfigPathOptions {
  return { root: process.cwd(), ...extraOptions }
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

function commonPlugins(options: Partial<PluginOptions> = {}): Plugins {
  const packageJson = readPackageJson()
  const plugins = [
    checkPlugin({
      enableBuild: true,
      overlay: { position: 'tr', initialIsOpen: false },
      eslint: {
        lintCommand: 'eslint "./src/**/*.tsx"',
        dev: {
          overrideConfig: {
            cache: true,
            cacheLocation: 'node_modules/.cache/.eslintcache',
            baseConfig: { extends: '@bn-digital/eslint-config/react' },
          },
          logLevel: ['error'],
        },
      },
      typescript: true,
      terminal: true,
    }),
    tsConfigPathsPlugin(resolveTsConfigPathOptions()),
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

export { commonPlugins, readPackageJson }
