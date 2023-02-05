import fs from 'fs'
import path from 'path'
import { splitVendorChunkPlugin } from 'vite'
import { default as checkPlugin } from 'vite-plugin-checker'
import { default as fontsPlugin } from 'vite-plugin-fonts'
import { VitePWA as pwaPlugin, VitePWAOptions } from 'vite-plugin-pwa'
import { default as analyticsPlugin, VitePluginRadarOptions } from 'vite-plugin-radar'
import { default as tsConfigPathsPlugin } from 'vite-tsconfig-paths'

import { env, NodeEnv } from './env'

function readPackageJson(workingDir = ''): Record<string, unknown> {
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
    injectRegister: 'auto',
    strategies: 'injectManifest',
    minify: true,
    ...extraOptions,
  }
}

function commonPlugins(options: Partial<PluginOptions> = {}): Plugins {
  type LogLevel = 'error' | 'warning'
  const workingDir = process.cwd()
  const logLevel: LogLevel[] = options.mode === 'production' ? ['error'] : ['error', 'warning']
  const packageJson = readPackageJson()
  const plugins = [splitVendorChunkPlugin(), tsConfigPathsPlugin({ root: workingDir })]
  if (options.lint) {
    const { enabled, ...checkOptions } = options.lint
    enabled &&
      plugins.push(
        checkPlugin({
          enableBuild: true,
          overlay: { position: 'tr', initialIsOpen: false },
          eslint: {
            lintCommand: 'eslint src/**/*.{ts,tsx}',
            dev: {
              overrideConfig: {
                cache: true,
                fix: true,
                cacheLocation: 'node_modules/.cache/eslintcache',
                baseConfig: {
                  extends: '@bn-digital/eslint-config/react',
                  ignorePatterns: ['src/graphql/index.tsx', 'src/types/graphql.d.ts'],
                },
              },
              logLevel,
            },
          },
          stylelint: {
            dev: {
              logLevel,
              overrideConfig: {
                cache: true,
                allowEmptyInput: true,
                fix: true,
                ignorePath: ['build', 'node_modules', 'dist', 'dev-dist'],
                cacheLocation: 'node_modules/.cache/stylelintcache',
                config: { extends: '@bn-digital/stylelint-config/less' },
              },
            },
            lintCommand: 'stylelint src/**/*.{vue,html,css,scss,sass,less,styl}',
          },
          typescript: { root: workingDir },
          terminal: true,
          ...checkOptions,
        })
      )
  }

  const fontsOptions = options?.fonts
  fontsOptions && plugins.push(fontsPlugin(fontsOptions))

  const analyticsOptions = options?.analytics && resolveAnalyticsOptions(options.analytics)
  analyticsOptions && plugins.push(analyticsPlugin(analyticsOptions))

  const pwaOptions =
    options?.pwa &&
    resolvePWAOptions({
      injectRegister: 'inline',
      registerType: 'autoUpdate',
      includeManifestIcons: true,
      mode: env<NodeEnv>('NODE_ENV') !== 'production' ? 'development' : 'production',
      ...options?.pwa,
      workbox: {
        sourcemap: env<NodeEnv>('NODE_ENV') !== 'production',
        mode: env<NodeEnv>('NODE_ENV', 'development'),
        ignoreURLParametersMatching: [/\/admin$/, /\/graphql/, /\/upload$/, /\/api$/],
        disableDevLogs: env<NodeEnv>('NODE_ENV') === 'production',
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              (['image', 'font', 'script', 'style'] as (typeof request.destination)[]).find(
                it => request.destination === it
              ),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'assets-cache' },
          },
        ],
        ...options?.pwa.workbox,
      },
      manifest: {
        name: packageJson.name as string,
        short_name: packageJson.name as string,
        scope: '/',
        start_url: '/',
        theme_color: '#7f7f7f',
        categories: ['Web Application'],
        ...options?.pwa?.manifest,
      },
    })
  pwaOptions && pwaPlugin(pwaOptions).forEach(it => plugins.push(it))

  return plugins
}

export { commonPlugins, readPackageJson }
