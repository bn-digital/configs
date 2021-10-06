import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'
import { getCliArgs, getConfig, Mode, getPackageMetadata } from './config'
import { getPlugins } from './plugins'
import { getRules } from './rules'
import fs from 'fs'

const packageConfig = getPackageMetadata()
const appDir = fs.realpathSync(process.cwd())
const args: { mode: string | Mode } = getCliArgs()

/**
 * Configures Webpack with multiple
 * @param {Partial<Configuration>} configuration
 * @param options
 */
export function mergeWithReact(
  configuration: Partial<Configuration> = { mode: 'development' },
  options: Partial<Webpack.Overrides> = {
    plugins: {},
    rules: {},
  },
): Partial<Configuration> {
  const mode = (process.env.NODE_ENV ?? configuration.mode ?? args.mode) as Mode
  const config = getConfig(mode)
  const plugins = getPlugins(mode)
  const rules = getRules(mode)
  const baseConfiguration: Partial<Configuration> = {
    ...config,
    infrastructureLogging: { level: 'none' },
    entry: './src/index.tsx',
    target: 'web',
    externalsPresets: { web: true },
    module: {
      rules: [
        rules.react(options.rules?.react),
        rules.images(options.rules?.images),
        rules.svgComponent(options.rules?.svgComponent),
        rules.svgUrl(options.rules?.svgUrl),
        rules.less(options.rules?.less),
        rules.scss(options.rules?.scss),
        rules.html(options.rules?.html),
        rules.fonts(options.rules?.fonts),
        rules.videos(options.rules?.videos),
      ],
    },
    plugins: Array.from([
      plugins.automaticPrefetch(),
      plugins.clean(options.plugins?.clean),
      plugins.copy(options?.plugins?.copy),
      plugins.define(process.env),
      plugins.dotenv(options.plugins?.dotenv),
      plugins.eslint(options.plugins?.eslint),
      plugins.html(options.plugins?.html),
      plugins.ignore(),
      plugins.miniCssExtract(options.plugins?.miniCss),
      plugins.nodePolyfill(),
      plugins.provide(options.plugins?.provide),
      plugins.stylelint(options.plugins?.stylelint),
    ]),
  }

  if (mode === 'production' || options.plugins?.workbox) {
    baseConfiguration?.plugins?.push(plugins.workbox(options.plugins?.workbox))
    if (options.plugins?.manifest?.swSrc) {
      baseConfiguration?.plugins?.push(plugins.manifest(options.plugins.manifest))
    }
    if ((options.plugins?.sentry?.authToken || process.env.SENTRY_AUTH_TOKEN) && process.env.SENTRY_URL && process.env.SENTRY_ORG) {
      baseConfiguration?.plugins?.push(
        plugins.sentry({
          include: appDir,
          url: process.env.SENTRY_URL,
          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT ?? packageConfig?.name.split('/')[0].replace('@', ''),
          authToken: options.plugins?.sentry?.authToken ?? process.env.SENTRY_AUTH_TOKEN,
          ...options.plugins?.sentry,
        }),
      )
    }
  }
  if (mode !== 'production') {
    if (options.plugins?.bundleAnalyzer) {
      baseConfiguration?.plugins?.push(plugins.bundleAnalyzer(options.plugins.bundleAnalyzer))
    }
  }

  return merge<Partial<Configuration>>(baseConfiguration, configuration)
}
