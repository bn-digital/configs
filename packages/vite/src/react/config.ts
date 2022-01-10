import {defineConfig} from 'vite'
import svgrPlugin from 'vite-plugin-svgr'
import path from 'path'
import reactPlugin from '@vitejs/plugin-react'
import fs from 'fs'
import {ManifestOptions, VitePWA as pwaPlugin} from 'vite-plugin-pwa'
import postcssPlugins from '@bn-digital/postcss-config'
import sentryPlugin, {ViteSentryPluginOptions} from 'vite-plugin-sentry'

function readPackageJson(): { name: string; proxy?: string } {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'))
}

interface ReactViteConfig {
  manifest?: ManifestOptions
  sentry?: ViteSentryPluginOptions
}

function withReact({ manifest, sentry }: Partial<ReactViteConfig> = {}) {
  const packageJson = readPackageJson()
  const target = packageJson?.proxy
  const workingDir = process.cwd()
  const plugins = [
    reactPlugin({
      jsxRuntime: 'automatic',
    }),
    svgrPlugin(),
    pwaPlugin({ manifest }),
  ]

  sentry && plugins.push(sentryPlugin(sentry))

  return defineConfig({
    plugins,
    define: {
      'process.env': {},
    },
    build: { outDir: 'build', manifest: true, minify: 'esbuild', target: 'esnext' },
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
