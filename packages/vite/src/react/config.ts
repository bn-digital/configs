import {defineConfig} from 'vite'
import svgrPlugin from 'vite-plugin-svgr'
import path from 'path'
import reactPlugin from '@vitejs/plugin-react'
import fs from 'fs'
import {VitePWA as pwaPlugin, VitePWAOptions} from 'vite-plugin-pwa'
import postcssPlugins from '@bn-digital/postcss-config'
import loaderPlugin from 'vite-plugin-loading-indicator'
import sentryPlugin, {ViteSentryPluginOptions} from 'vite-plugin-sentry'
import {imagetools as imageToolsPlugin} from 'vite-imagetools'
import {default as analyticsPlugin, VitePluginRadarOptions} from 'vite-plugin-radar'
import fontsPlugin from 'vite-plugin-fonts'
import {ReactVitePlugins} from '../index'

function readPackageJson(workingDir: string): { name: string; proxy?: string; description: string } {
  return JSON.parse(fs.readFileSync(path.join(workingDir, 'package.json'), 'utf-8'))
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

function withReact(options: Partial<ReactVitePlugins> = { sentry: {}, analytics: {}, pwa: {}, fonts: {} }) {
  const workingDir = process.cwd()
  const packageJson = readPackageJson(workingDir)
  const target = packageJson?.proxy
  const plugins = [
    reactPlugin({
      jsxRuntime: 'automatic',
    }),
    imageToolsPlugin({ removeMetadata: true }),
    loaderPlugin({ name: 'chasing-dots' }),
    svgrPlugin({ esbuildOptions: { sourcemap: true }, svgrOptions: { svgo: false } }),
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
  pwaOptions && plugins.push(pwaPlugin())

  const sentryOptions =
    options?.sentry &&
    resolveSentryOptions({
      project: packageJson.name,
      ...options.sentry,
    })
  sentryOptions && plugins.push(sentryPlugin(sentryOptions))

  return defineConfig({
    plugins,

    define: {
      'process.env': {},
    },
    build: {
      outDir: 'build',
      chunkSizeWarningLimit: 1024,
      sourcemap: true,
      manifest: true,
      minify: 'esbuild',
      target: 'esnext',
    },
    envDir: workingDir,
    envPrefix: 'WEBSITE_',
    server: {
      port: Number.parseInt(process.env.WEBSITE_PORT ?? '8080'),
      strictPort: false,
      fs: {
        strict: false,
      },
      proxy: target
        ? {
            '/api': { target },
            '/graphql': { target },
            '/admin': { target },
            '/upload': { target },
          }
        : undefined,
    },
    worker: { format: 'es' },
    css: { postcss: { plugins: postcssPlugins }, preprocessorOptions: { less: { javascriptEnabled: true } } },
    resolve: { alias: { src: path.resolve(workingDir, './src') } },
  })
}

export { withReact }
