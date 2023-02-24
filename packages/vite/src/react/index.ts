import { default as reactPlugin } from '@vitejs/plugin-react'
import { default as reactSwcPlugin } from '@vitejs/plugin-react-swc'
import { defineConfig, UserConfigExport } from 'vite'
import graphqlCodegenPlugin from 'vite-plugin-graphql-codegen'
import { default as svgrPlugin } from 'vite-plugin-svgr'

import { commonOptions } from '../common'

function reactPlugins(params: Partial<ReactOptions> = { swc: false }): Plugins {
  return [
    params.swc
      ? reactSwcPlugin()
      : reactPlugin({
          jsxRuntime: 'automatic',
        }),
    svgrPlugin({
      svgrOptions: { svgo: false },
    }),
  ]
}

function withReact(
  config: Partial<PluginOptions> = { graphql: { enabled: true }, lint: { enabled: true } }
): UserConfigExport {
  return defineConfig({
    appType: 'spa',
    build: {
      chunkSizeWarningLimit: 1024,
      cssCodeSplit: true,
      emptyOutDir: true,
      manifest: true,
      modulePreload: true,
      assetsInlineLimit: 1024 * 16,
      outDir: 'build',
      target: 'esnext',
    },
    ...commonOptions(
      {
        css: {
          preprocessorOptions: { less: { javascriptEnabled: true } },
        },
        plugins: [
          ...reactPlugins(config?.react),
          ...[config.graphql?.enabled && graphqlCodegenPlugin({ runOnBuild: false })].filter(Boolean),
        ],
      },
      config
    ),
  })
}

export { withReact }
