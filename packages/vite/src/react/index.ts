import { default as reactPlugin } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import graphqlCodegenPlugin from 'vite-plugin-graphql-codegen'
import svgrPlugin from 'vite-plugin-svgr'

import { commonOptions } from '../common'

function reactPlugins(params: ReactOptions & Pick<PluginOptions, 'sourceMaps'>): Plugins {
  return [
    reactPlugin({
      jsxRuntime: 'automatic',
    }),
    graphqlCodegenPlugin({ runOnBuild: false }),
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
      minify: 'terser',
      outDir: 'build',
      target: "esnext",
      sourcemap: config.sourceMaps,
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
