import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'
import production from './production'
import development from './development'

import { babel, ejs, fonts, images, lessPostCss, svgInComponents, svgInStyles } from './rules'
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
} from './plugins'
import { WebpackCustomConfiguration } from './index'

/**
 * Configures Webpack with multiple
 * @param {Configuration} configuration
 * @param {Partial<WebpackCustomConfiguration>} options
 */
export function mergeWithReact(
  configuration: Configuration = { mode: 'development' },
  options: Partial<WebpackCustomConfiguration> = { plugins: [] },
): Configuration {
  const mode = (process.env.NODE_ENV ?? configuration.mode) as 'production' | 'development'
  const envConfiguration = mode === 'production' ? production : development
  const baseConfiguration = {
    ...envConfiguration,
    module: {
      rules: [fonts, svgInComponents, svgInStyles, images, lessPostCss, babel, ejs],
    },
    plugins: Array.from([
      dotenvPlugin(options?.dotenv),
      cleanPlugin(options?.clean),
      definePlugin(process.env),
      eslintPlugin(options?.eslint),
      stylelintPlugin(options?.stylelint),
      htmlPlugin(options?.html),
      providePlugin(options?.provide),
      automaticPrefetchPlugin(),
      miniCssExtractPlugin(),
    ]),
  }
  if (options.plugins) {
    options.plugins.forEach(plugin => baseConfiguration?.plugins?.push(plugin))
  }
  if (envConfiguration?.mode === 'production' || options.workbox) {
    baseConfiguration?.plugins?.push(workboxPlugin(options.workbox))
    if (options.manifest?.swSrc) {
      baseConfiguration?.plugins?.push(manifestPlugin(options.manifest))
    }
  }
  if (envConfiguration?.mode !== 'production' && options?.bundleAnalyzer) {
    baseConfiguration?.plugins?.push(bundleAnalyzer(options.bundleAnalyzer))
  }

  return merge<Configuration>(baseConfiguration, configuration)
}
