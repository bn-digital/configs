import {defineConfig} from 'vite'
import svgrPlugin from 'vite-plugin-svgr/lib'
import path from 'path'
import reactPlugin from '@vitejs/plugin-react'
import fs from 'fs'
import {VitePWA as pwaPlugin} from 'vite-plugin-pwa'
import postcssPlugins from '@bn-digital/postcss-config'

function readPackageJson(): { proxy?: string } {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'))
}

function withReact() {
  const packageJson = readPackageJson()
  const target = packageJson?.proxy
  const workingDir = process.cwd()

  return defineConfig({
    plugins: [
      reactPlugin({
        jsxRuntime: 'automatic',
        babel: {
          plugins: [
            [
              'import',
              {
                libraryName: 'antd',
                libraryDirectory: 'es',
              },
            ],
          ],
        },
      }),
      svgrPlugin(),
      pwaPlugin(),
    ],
    build: { outDir: 'build' },
    envDir: workingDir,
    envPrefix: 'WEBSITE_',
    server: {
      port: Number.parseInt(process.env.WEBSITE_PORT ?? '8080'),
      strictPort: false,
      proxy: target
        ? {
            '/api': { target },
            '/graphql': { target },
            '/admin': { target },
            '/upload': { target },
          }
        : undefined,
    },
    css: { postcss: { plugins: postcssPlugins }, preprocessorOptions: { less: { javascriptEnabled: true } } },
    resolve: { alias: { src: path.resolve(workingDir, './src') } },
  })
}

export { withReact }
