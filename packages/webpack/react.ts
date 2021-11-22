import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'
import { getCliArgs, getConfig, Mode } from './config'
import { getPlugins } from './plugins'
import { getRules } from './rules'
import { realpathSync } from 'fs'
import { getPackageMetadata } from './getPackageMetadata'

const packageConfig = getPackageMetadata()
const appDir = realpathSync(process.cwd())
const args: { mode: string | Mode } = getCliArgs()

/**
 * Configures Webpack with multiple configurations
 * @param {Partial<Configuration>} configuration
 * @param {Partial<Webpack.Overrides>} options
 * @return {Partial<Configuration>}
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
    entry: './src/index.tsx',
    module: {
      rules: [
        rules.images(options.rules?.images),
        rules.less(options.rules?.less),
        rules.lessModules(options.rules?.lessModules),
        rules.scss(options.rules?.scss),
        rules.fonts(options.rules?.fonts),
        rules.videos(options.rules?.videos),
        rules.svgr(options.rules?.svgr),
        rules.svg(options.rules?.svgr),
        rules.react(options.rules?.react),
      ],
    },
    plugins: Array.from([
      plugins.clean(options.plugins?.clean),
      plugins.nodePolyfill(),
      plugins.automaticPrefetch(),
      plugins.contextReplacement(),
      plugins.copy(options?.plugins?.copy),
      plugins.define(process.env),
      plugins.dotenv(options.plugins?.dotenv),
      plugins.eslint(options.plugins?.eslint),
      plugins.stylelint(options.plugins?.stylelint),
      plugins.html(options.plugins?.html),
      plugins.ignore(),
    ]),
  }

  if (mode === 'production') {
    if (options.plugins?.workbox) {
      baseConfiguration?.plugins?.push(plugins.workbox(options.plugins?.workbox))
      if (options.plugins?.manifest?.swSrc) {
        baseConfiguration?.plugins?.push(plugins.manifest(options.plugins.manifest))
      }
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

    baseConfiguration.plugins?.push(plugins.miniCssExtract(options.plugins?.miniCss), plugins.cssMinimizer())
  } else {
    if (options.plugins?.bundleAnalyzer) {
      baseConfiguration?.plugins?.push(plugins.bundleAnalyzer(options.plugins.bundleAnalyzer))
    }
    baseConfiguration.plugins?.push(plugins.reactRefresh())
  }

  return merge<Partial<Configuration>>(baseConfiguration, configuration)
}
