import { merge } from 'webpack-merge'
import { Configuration } from 'webpack/types'
import production from './production'
import development from './development'
import yargs from 'yargs/yargs'
import { babel, ejs, fonts, images, less, svgInComponents, svgInStyles } from './rules'
import {
  automaticPrefetchPlugin,
  bundleAnalyzer,
  definePlugin,
  dotenvPlugin,
  eslintPlugin,
  htmlPlugin,
  miniCssExtractPlugin,
  stylelintPlugin,
} from './plugins'
import { config } from 'dotenv'
import { Options as HtmlOptions } from 'html-webpack-plugin'
import { Options as EslintOptions } from 'eslint-webpack-plugin'
import { Options as StylelintOptions } from 'stylelint-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

config()

const argv = yargs(process.argv.slice(2))
  .options({
    mode: { type: 'string', default: 'development' },
  })
  .parseSync()

type WebpackCustomConfiguration = Pick<Configuration, 'plugins'> & {
  html: HtmlOptions
  eslint: EslintOptions
  stylelint: StylelintOptions
  bundleAnalyzer: BundleAnalyzerPlugin.Options
}

/**
 * Configures Webpack with multiple
 * @param {Configuration} configuration
 * @param {Partial<WebpackCustomConfiguration>} options
 */
function mergeWithReact(configuration: Configuration, options: Partial<WebpackCustomConfiguration>) {
  const envConfiguration: Configuration =
    process.env.NODE_ENV === 'production' || argv.mode === 'production' ? production : development
  const baseConfiguration: Configuration = {
    ...envConfiguration,
    module: {
      rules: [fonts, svgInComponents, svgInStyles, images, less, babel, ejs],
    },
    plugins: [
      dotenvPlugin(),
      definePlugin(process.env),
      eslintPlugin(options?.eslint),
      stylelintPlugin(options?.stylelint),
      htmlPlugin(options?.html),
      bundleAnalyzer(options?.bundleAnalyzer),
      automaticPrefetchPlugin(),
      miniCssExtractPlugin(),
    ],
  }
  if (options?.plugins) {
    options.plugins.forEach(instance => baseConfiguration.plugins?.push(instance))
  }
  return merge(baseConfiguration, configuration)
}

export { mergeWithReact }
