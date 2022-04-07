import postcssPlugins from '@bn-digital/postcss-config'
import reactPlugin from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import svgrPlugin from 'vite-plugin-svgr'
import swcPlugin from 'vite-plugin-swc-react'

import {commonOptions} from '../common'
import Vite from '../types/config'

function reactPlugins(): Vite.Plugins {
  return [
    reactPlugin({
      jsxRuntime: 'automatic',
    }),
    swcPlugin({jsxRuntime:'automatic', reactFresh: false}),
    svgrPlugin({ esbuildOptions: { sourcemap: Boolean(process.env.SOURCE_MAPS) }, svgrOptions: { icon: true, svgo: false } }),
  ]
}

const withReact: Vite.ConfigCallback = config =>
  defineConfig({
    build: {
      chunkSizeWarningLimit: 1024,
      cssCodeSplit: true,
      emptyOutDir: true,
      manifest: true,
      minify: 'esbuild',
      outDir: 'build',
      polyfillModulePreload: true,
      sourcemap: Boolean(process.env.SOURCE_MAPS),
      target: 'esnext',
    },
    esbuild: {
      sourcemap: Boolean(process.env.SOURCE_MAPS),
    },
    ...commonOptions(
      {
        plugins: reactPlugins(),
        css: {
          devSourcemap: Boolean(process.env.SOURCE_MAPS),
          postcss: { plugins: postcssPlugins },
          preprocessorOptions: { less: { javascriptEnabled: true } },
        },
      },
      config,
    ),
  })

export { withReact }
