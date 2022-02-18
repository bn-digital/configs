import { defineConfig, PluginOption } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import { ConfigCallback } from '../index'
import { commonOptions } from '../common'
import svgrPlugin from 'vite-plugin-svgr'

function reactPlugins(): PluginOption[] {
  const plugins: PluginOption[] = []
  plugins.concat(
    reactPlugin({
      jsxRuntime: 'automatic',
    }),
    svgrPlugin({ esbuildOptions: { sourcemap: true }, svgrOptions: { svgo: false } }),
  )
  return plugins
}

const withReact: ConfigCallback = config =>
  defineConfig({
    build: {
      outDir: 'build',
      emptyOutDir: true,
      polyfillModulePreload: true,
      chunkSizeWarningLimit: 1024,
      sourcemap: true,
      minify: 'esbuild',
      target: 'esnext',
    },
    esbuild: {
      tsconfigRaw: `{
          "compilerOptions": {
            "useDefineForClassFields": true,
            "jsx": "react-jsx"
          },
        }`,
      charset: 'utf8',
      minify: false,
      sourcemap: true,
      keepNames: true,
    },
    ...commonOptions({ plugins: reactPlugins(), css: { preprocessorOptions: { less: { javascriptEnabled: true } } } }, config),
  })

export { withReact }
