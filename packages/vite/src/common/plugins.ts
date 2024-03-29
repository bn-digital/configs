import { splitVendorChunkPlugin } from "vite"
import { default as checkPlugin } from "vite-plugin-checker"
import { default as fontsPlugin } from "vite-plugin-fonts"
import graphqlCodegenPlugin from "vite-plugin-graphql-codegen"
import { default as buildInfoPlugin } from "vite-plugin-info"
import ogPlugin from "vite-plugin-open-graph"
import { VitePWA as pwaPlugin, VitePWAOptions } from "vite-plugin-pwa"
import { default as analyticsPlugin, VitePluginRadarOptions } from "vite-plugin-radar"
import { default as tsConfigPathsPlugin } from "vite-tsconfig-paths"

import vite from "../types"

function resolveAnalyticsOptions({
  analytics = undefined,
  gtm = undefined,
  ...extraOptions
}: Partial<VitePluginRadarOptions>): Partial<VitePluginRadarOptions> {
  return {
    analytics: process.env.GOOGLE_ANALYTICS_ID
      ? { disable: false, id: process.env.GOOGLE_ANALYTICS_ID, ...analytics }
      : analytics,
    gtm: process.env.GOOGLE_TAG_MANAGER_ID ? { id: process.env.GOOGLE_TAG_MANAGER_ID, ...gtm } : gtm,
    ...extraOptions,
  }
}

function resolvePWAOptions(options?: Partial<VitePWAOptions>): Partial<VitePWAOptions> {
  return {
    injectRegister: "auto",
    strategies: "injectManifest",
    minify: true,
    ...options,
  }
}

function resolveCheckPluginOptions(app: vite.App, overrides: Parameters<typeof checkPlugin>[0]) {
  const logLevel: vite.LogLevel[] = app.mode !== "development" ? ["error"] : ["error", "warning"]

  return checkPlugin({
    enableBuild: true,
    overlay: { position: "tr", initialIsOpen: false },
    eslint: {
      lintCommand: "src/**/*.{ts,tsx}",
      dev: {
        overrideConfig: {
          fix: false,
          fixTypes: ["layout", "problem"],
          cache: true,
          cacheLocation: ".cache/eslintcache",
        },
        logLevel,
      },
      ...overrides.eslint,
    },
    stylelint: {
      dev: {
        logLevel,
        overrideConfig: {
          cache: true,
          cacheLocation: ".cache/stylelintcache",
          allowEmptyInput: true,
          customSyntax: "postcss-less",
          fix: false,
          files: ["src/**/*.{less,css}"],
          config: { extends: "@bn-digital/stylelint-config" },
        },
      },
      lintCommand: "src/**/*.{less,css}",
      ...overrides.stylelint,
    },
    typescript: { root: app.workingDir, buildMode: app.mode !== "development" },
    terminal: app.mode === "development",
    ...overrides,
  })
}

function commonPlugins(app: vite.App, pluginOptions: vite.PluginOptions): vite.Plugins {
  const plugins = [splitVendorChunkPlugin(), tsConfigPathsPlugin({ root: app.workingDir })]
  if (pluginOptions.lint) {
    const { enabled, ...checkOptions } = pluginOptions.lint
    enabled && plugins.push(resolveCheckPluginOptions(app, checkOptions))
  }

  if (pluginOptions.buildInfo) {
    const { enabled, ...buildInfoOptions } = pluginOptions.buildInfo
    enabled && plugins.push(buildInfoPlugin({ meta: buildInfoOptions.meta }))
  }

  const fontsOptions = pluginOptions?.fonts
  fontsOptions && plugins.push(fontsPlugin(fontsOptions))

  const analyticsOptions = pluginOptions?.analytics && resolveAnalyticsOptions(pluginOptions.analytics)
  analyticsOptions && plugins.push(analyticsPlugin(analyticsOptions))

  if (pluginOptions?.pwa) {
    const pwaOptions = resolvePWAOptions({
      injectRegister: "inline",
      registerType: "autoUpdate",
      includeManifestIcons: true,
      mode: app.buildMode,
      ...pluginOptions?.pwa,
      workbox: {
        sourcemap: app.isDev,
        mode: app.buildMode,
        ignoreURLParametersMatching: [/\/admin$/, /\/graphql/, /\/upload$/, /\/api$/],
        disableDevLogs: app.isProd,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              (["image", "font", "script", "video", "style"] as (typeof request.destination)[]).find(
                it => request.destination === it
              ),
            method: "GET",
            handler: "StaleWhileRevalidate",
            options: { cacheName: "assets-cache" },
          },
          {
            urlPattern: /\/graphql\/.*$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "graphql-cache",
              precacheFallback: { fallbackURL: `https://${app.fqdn}/graphql` },
            },
            method: "POST",
          },
        ],
        ...pluginOptions.pwa?.workbox,
      },
      manifest: {
        name: app.name[0].toUpperCase().concat(app.name.slice(1)),
        short_name: app.name,
        scope: "/",
        start_url: "/",
        theme_color: "#7f7f7f",
        categories: ["Web Application"],
        ...pluginOptions?.pwa?.manifest,
      },
    })
    pluginOptions.pwa?.enabled && pwaPlugin(pwaOptions).forEach(it => plugins.push(it))
  }
  pluginOptions?.graphql && plugins.push(graphqlCodegenPlugin({ runOnBuild: false, ...pluginOptions.graphql }))
  pluginOptions?.openGraph && plugins.push(ogPlugin(pluginOptions.openGraph))

  return plugins
}

export { commonPlugins }
