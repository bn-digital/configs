import { default as reactPlugin } from '@vitejs/plugin-react'
import { default as reactSwcPlugin } from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import graphqlCodegenPlugin from 'vite-plugin-graphql-codegen'
import { default as svgrPlugin } from 'vite-plugin-svgr'

import { commonOptions } from '../common'

function reactPlugins(params: ReactOptions & Partial<PluginOptions>): Plugins {
  return [
    params.react?.swc
      ? reactSwcPlugin()
      : reactPlugin({
          jsxRuntime: 'automatic',
        }),
    svgrPlugin({
      svgrOptions: { svgo: false },
    }),
  ].concat(params.graphql ? graphqlCodegenPlugin({ runOnBuild: false }) : [])
}

const withReact: ConfigCallback = config => {
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
        plugins: reactPlugins({
          graphql: config.react?.graphql ?? true,
          swc: config.react?.swc ?? false,
          ...config.react,
        }),
      },
      config
    ),
  })
}

export { withReact }
