import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'
import production from './production'
import development from './development'

import { fonts, images, less, react, sass, svgComponent, svgUrl, videos } from './rules'

import {
  automaticPrefetchPlugin,
  bundleAnalyzer,
  definePlugin,
  dotenvPlugin,
  eslintPlugin,
  providePlugin,
  htmlPlugin,
  miniCssExtractPlugin,
  stylelintPlugin,
  cleanPlugin,
  workboxPlugin,
  manifestPlugin,
  sentryPlugin,
  nodePolyfillPlugin,
  progressPlugin,
  ignorePlugin,
} from './plugins'
import { WebpackCustomConfiguration } from './index'
import { cliArgs, Mode, packageJson } from './config'

const packageConfig = packageJson()
const args: { mode: string | Mode } = cliArgs()

/**
 * Configures Webpack with multiple
 * @param {Partial<Configuration>} configuration
 * @param {Partial<WebpackCustomConfiguration>} options
 */
export function mergeWithReact(
  configuration: Partial<Configuration> = { mode: 'development' },
  options: Partial<WebpackCustomConfiguration> = {
    plugins: [],
  },
): Configuration {
  const mode = (process.env.NODE_ENV ?? configuration.mode ?? args.mode) as Mode
  const envConfiguration: Configuration = mode === 'production' ? production : development
  const baseConfiguration: Configuration = {
    ...envConfiguration,
    entry: './src/index.tsx',
    target: 'web',
    module: {
      rules: [react, images, videos, svgComponent, svgUrl, less, sass, fonts],
    },
    plugins: Array.from([
      dotenvPlugin(options?.dotenv),
      cleanPlugin(options?.clean),
      definePlugin(process.env),
      eslintPlugin({
        ...options?.eslint,
        failOnError: mode === 'production',
      }),
      stylelintPlugin({ ...options?.stylelint, failOnError: mode === 'production' }),
      htmlPlugin({
        ...options?.html,
        minify: mode !== 'development',
      }),
      providePlugin(options?.provide),
      ignorePlugin(),
      automaticPrefetchPlugin(),
      miniCssExtractPlugin(),
      nodePolyfillPlugin(),
      progressPlugin(),
    ]),
  }

  options?.plugins?.forEach(plugin => baseConfiguration?.plugins?.push(plugin))

  if (envConfiguration?.mode === 'production' || options.workbox) {
    baseConfiguration?.plugins?.push(workboxPlugin(options.workbox))
    if (options.manifest?.swSrc) {
      baseConfiguration?.plugins?.push(manifestPlugin(options.manifest))
    }
    if ((options.sentry?.authToken || process.env.SENTRY_AUTH_TOKEN) && process.env.SENTRY_URL && process.env.SENTRY_ORG) {
      baseConfiguration?.plugins?.push(
        sentryPlugin({
          include: process.cwd(),
          url: process.env.SENTRY_URL,
          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT ?? packageConfig?.name.split('/')[0].replace('@', ''),
          authToken: options.sentry?.authToken ?? process.env.SENTRY_AUTH_TOKEN,
          ...options.sentry,
        }),
      )
    }
  }
  if (envConfiguration?.mode !== 'production') {
    if (options?.bundleAnalyzer) {
      baseConfiguration?.plugins?.push(bundleAnalyzer(options.bundleAnalyzer))
    }
  }

  return merge<Configuration>(baseConfiguration, configuration)
}
