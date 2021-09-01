import ESLintWebpackPlugin, { Options as EslintPluginOptions } from 'eslint-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin, { PluginOptions as MiniCssPluginOptions } from 'mini-css-extract-plugin'
import { CleanWebpackPlugin, Options as CleanPluginOption } from 'clean-webpack-plugin'
import {
  ProvidePlugin,
  AutomaticPrefetchPlugin,
  Compiler,
  WebpackPluginInstance,
  DefinePlugin,
  IgnorePlugin,
} from 'webpack'
import StylelintWebpackPlugin, { Options as StylelintPluginOptions } from 'stylelint-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import DotenvPlugin from 'dotenv-webpack'

export type WebpackPlugin = ((this: Compiler, compiler: Compiler) => void) | WebpackPluginInstance | any

/**
 * Defines environment variables from process.env
 * @param envVars
 */
export function definePlugin(envVars: NodeJS.Dict<string> = {}): WebpackPlugin {
  return new DefinePlugin(envVars)
}

export function bundleAnalyzer(options: BundleAnalyzerPlugin.Options = {}): WebpackPlugin {
  return new BundleAnalyzerPlugin(options)
}

/**
 * Defines environment variables from process.env
 * @param {DotenvPlugin.Options} options
 */
export function dotenvPlugin(options: DotenvPlugin.Options = {}): WebpackPlugin {
  return new DotenvPlugin(options)
}

/**
 * HTML Plugin
 * @param options
 */
export function htmlPlugin(options: HtmlWebpackPlugin.Options = {}): WebpackPlugin {
  return new HtmlWebpackPlugin(options)
}

/**
 * ESLint plugin
 * @param {EslintPluginOptions} options
 *  @return {WebpackPlugin}
 */
export function eslintPlugin(options: EslintPluginOptions = {}): WebpackPlugin {
  return new ESLintWebpackPlugin({
    cache: true,
    cacheLocation: 'build/.cache/.eslintcache',
    extensions: ['tsx', 'ts'],
    ...options,
  })
}

/**
 * Stylelint plugin
 * @param {StylelintPluginOptions} options
 * @return {WebpackPlugin}
 */
export function stylelintPlugin(options: StylelintPluginOptions = {}): WebpackPlugin {
  return new StylelintWebpackPlugin({
    extensions: ['less', 'css', 'scss'],
    cache: true,
    cacheLocation: 'build/.cache/.stylelintcache',
    ...options,
  })
}

/**
 * Cleans up output directory before build
 * @param options
 */
export function cleanPlugin(options: CleanPluginOption = { protectWebpackAssets: true }): WebpackPlugin {
  return new CleanWebpackPlugin()
}

/**
 * Makes accessible process.env from withing client app
 */
export function providePlugin(): WebpackPlugin {
  return new ProvidePlugin({
    process: 'process/browser',
  })
}

export function ignorePlugin(): WebpackPlugin {
  return new IgnorePlugin({ contextRegExp: /^\.\/locale$/, resourceRegExp: /moment$/ })
}

export function automaticPrefetchPlugin(): WebpackPlugin {
  return new AutomaticPrefetchPlugin()
}

/**
 * Extracts CSS into separate files
 * @param options
 */
export function miniCssExtractPlugin(options: MiniCssPluginOptions = {}): WebpackPlugin {
  return new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css',
    chunkFilename: 'styles/[id].[chunkhash].css',
    ...options,
  })
}
