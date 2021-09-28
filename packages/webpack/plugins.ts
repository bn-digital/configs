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
  ProgressPlugin,
} from 'webpack'
import StylelintWebpackPlugin, { Options as StylelintPluginOptions } from 'stylelint-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import DotenvPlugin from 'dotenv-webpack'
import TerserPlugin from 'terser-webpack-plugin'
import { GenerateSW, GenerateSWOptions as WorkboxOptions, InjectManifestOptions, InjectManifest } from 'workbox-webpack-plugin'
import SentryCliPlugin, { SentryCliPluginOptions } from '@sentry/webpack-plugin'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'

export type WebpackPlugin = ((this: Compiler, compiler: Compiler) => void) | WebpackPluginInstance | any

/**
 * Defines environment variables from process.env
 * @param envVars
 */
export function definePlugin(envVars: NodeJS.Dict<string> = {}): WebpackPlugin {
  return new DefinePlugin(envVars)
}

export function bundleAnalyzer(options: BundleAnalyzerPlugin.Options): WebpackPlugin {
  return new BundleAnalyzerPlugin(options)
}

export function dotenvPlugin(options: DotenvPlugin.Options = {}): WebpackPlugin {
  return new DotenvPlugin(options)
}

export function nodePolyfillPlugin(options: NodePolyfillPlugin.Options = {}): WebpackPlugin {
  return new NodePolyfillPlugin(options)
}

/**
 * HTML Plugin
 * @param options
 */
export function htmlPlugin(
  options: HtmlWebpackPlugin.Options = {
    inject: true,
    templateParameters: {},
    template: 'src/index.html',
    minify: false,
  },
): WebpackPlugin {
  return new HtmlWebpackPlugin({
    ...options,
    minify:
      options.minify === true
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : options.minify,
  })
}

/**
 * ESLint plugin
 * @param {EslintPluginOptions} options
 *  @return {WebpackPlugin}
 */
export function eslintPlugin(options: EslintPluginOptions = {}): WebpackPlugin {
  return new ESLintWebpackPlugin({
    cacheLocation: 'build/.cache/.eslintcache',
    extensions: ['tsx', 'ts'],
    eslintPath: require.resolve('eslint'),
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
    cacheLocation: 'build/.cache/.stylelintcache',
    stylelintPath: require.resolve('stylelint'),
    ...options,
  })
}

/**
 * Cleans up output directory before build
 * @param options
 */
export function cleanPlugin(options: CleanPluginOption = {}): WebpackPlugin {
  return new CleanWebpackPlugin(options)
}

/**
 * Makes accessible process.env from withing client app
 */
export function providePlugin(options: { [key: string]: string } = { process: 'process/browser' }): WebpackPlugin {
  return new ProvidePlugin(options)
}

export function terserPlugin(): WebpackPlugin {
  return new TerserPlugin({
    parallel: true,
  })
}

export function ignorePlugin(): WebpackPlugin {
  return new IgnorePlugin({ contextRegExp: /^\.\/locale$/, resourceRegExp: /moment$/ })
}

export function automaticPrefetchPlugin(): WebpackPlugin {
  return new AutomaticPrefetchPlugin()
}

/**
 * @param {InjectManifestOptions} options
 */
export function manifestPlugin(
  options: InjectManifestOptions = {
    maximumFileSizeToCacheInBytes: 1e6,
    swSrc: 'src/service-worker.ts',
  },
): WebpackPlugin {
  return new InjectManifest(options)
}

/**
 * @param {WorkboxOptions} options
 */
export function workboxPlugin(options: WorkboxOptions = { maximumFileSizeToCacheInBytes: 1e6 }): WebpackPlugin {
  return new GenerateSW(options)
}

/**
 * @param {SentryCliPluginOptions} options
 */
export function sentryPlugin(options: SentryCliPluginOptions = { include: '.' }): WebpackPlugin {
  return new SentryCliPlugin(options)
}

export function progressPlugin(
  options: Partial<typeof ProgressPlugin.defaultOptions> = {
    activeModules: true,
    entries: true,
    modules: true,
  },
): WebpackPlugin {
  return new ProgressPlugin(options)
}

/**
 * Extracts CSS into separate files
 * @param options
 */
export function miniCssExtractPlugin(options: MiniCssPluginOptions = {}): WebpackPlugin {
  return new MiniCssExtractPlugin({
    filename: `styles/[name]${process.env.NODE_ENV === 'production' ? '.[contenthash:8]' : ''}.css`,
    chunkFilename: `styles/[name]${process.env.NODE_ENV === 'production' ? '.[contenthash:8]' : ''}.chunk.css`,
    ignoreOrder: true,
    ...options,
  })
}
