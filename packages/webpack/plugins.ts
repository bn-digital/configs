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
import DotenvPlugin from 'dotenv-webpack'

export type WebpackPlugin =
  | { apply: (compiler: Compiler) => void }
  | ((this: Compiler, compiler: Compiler) => void)
  | WebpackPluginInstance

/**
 * Defines environment variables from process.env
 * @param envVars
 */
export function definePlugin(envVars: NodeJS.Dict<string> = {}): WebpackPlugin {
  return new DefinePlugin(envVars)
}

/**
 * Defines environment variables from process.env
 * @param {DotenvPlugin.Options} options
 */
export function dotenvPlugin(options: DotenvPlugin.Options = {}): WebpackPlugin {
  return new DotenvPlugin({ expand: true })
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
    cacheLocation: '.cache/.eslintcache',
    extensions: ['tsx', 'ts'],
    eslintPath: require.resolve('eslint'),
    baseConfig: { extends: require.resolve('@bn-digital/eslint-config') },
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
    extensions: ['.less', '.css', '.scss'],
    cacheLocation: './build/reports/.stylelintcache',
    config: require('@bn-digital/stylelint-config'),
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
export function miniCssExtractPlugin(options: MiniCssPluginOptions = {}) {
  return new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css',
    chunkFilename: 'styles/[id].[chunkhash].css',
    ...options,
  })
}
