import reactPlugin from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgrPlugin from 'vite-plugin-svgr'

import { commonOptions } from '../common'

function reactPlugins(params: ReactOptions & Pick<PluginOptions, 'sourceMaps'>): Plugins {
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

const withReact: ConfigCallback = config =>
  defineConfig({
    build: {
      chunkSizeWarningLimit: 1024,
      cssCodeSplit: true,
      emptyOutDir: true,
      manifest: true,
      minify: 'esbuild',
      outDir: 'build',
      sourcemap: config.sourceMaps,
      target: config.browsers,
      cssTarget: config.browsers,
    },
    ...commonOptions(
      {
        css: { devSourcemap: config.sourceMaps, preprocessorOptions: { less: { javascriptEnabled: true } } },
        plugins: reactPlugins({ antd: config.react?.antd ?? false, sourceMaps: config.sourceMaps ?? process.env.NODE_ENV !== 'production', ...config.react }),
      },
      config,
    ),
  })

export { withReact }
