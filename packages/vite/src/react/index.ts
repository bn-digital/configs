import postcssPlugins from '@bn-digital/postcss-config'
import reactPlugin from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgrPlugin from 'vite-plugin-svgr'

import { commonOptions } from '../common'
import Vite from '../types/config'

function reactPlugins(params: Vite.ReactOptions & Pick<Vite.PluginOptions, 'sourceMaps'>): Vite.Plugins {
  return [
    reactPlugin({
      jsxRuntime: 'automatic',
    }),
    svgrPlugin({
      esbuildOptions: { sourcemap: params.sourceMaps },
      svgrOptions: { svgo: false },
    }),
  ]
}

const withReact: Vite.ConfigCallback = config =>
  defineConfig({
    build: {
      chunkSizeWarningLimit: 1024,
      cssCodeSplit: true,
      emptyOutDir: true,
      manifest: true,
      minify: process.env.NODE_ENV === 'production',
      outDir: 'build',
      sourcemap: config.sourceMaps,
      target: config.browsers,
      cssTarget: config.browsers,
    },
    ...commonOptions(
      {
        plugins: reactPlugins({ antd: false, sourceMaps: process.env.NODE_ENV !== 'production', ...config.react }),
        css: {
          devSourcemap: config.sourceMaps,
          postcss: { plugins: postcssPlugins },
          preprocessorOptions: { less: { javascriptEnabled: true } },
        },
      },
      config,
    ),
  })

export { withReact }
