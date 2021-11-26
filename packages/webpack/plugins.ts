import ESLintWebpack, { Options as EslintOptions, Options as EslintPluginOptions } from 'eslint-webpack-plugin'
import HtmlWebpackPlugin, { Options as HtmlOptions } from 'html-webpack-plugin'
import MiniCssExtract, { PluginOptions as MiniCssOptions, PluginOptions as MiniCssPluginOptions } from 'mini-css-extract-plugin'
import { CleanWebpackPlugin, Options as CleanOptions, Options as CleanPluginOption } from 'clean-webpack-plugin'
import { AutomaticPrefetchPlugin, Compiler, ContextReplacementPlugin, DefinePlugin, IgnorePlugin, WebpackPluginInstance } from 'webpack'
import StylelintWebpack, { Options as StylelintOptions, Options as StylelintPluginOptions } from 'stylelint-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import DotenvPlugin, { Options as DotenvOptions } from 'dotenv-webpack'
import TerserPlugin from 'terser-webpack-plugin'
import {
  GenerateSW,
  GenerateSWOptions as WorkboxOptions,
  InjectManifest,
  InjectManifestOptions,
  InjectManifestOptions as ManifestOptions,
} from 'workbox-webpack-plugin'
import SentryCli, { SentryCliPluginOptions as SentryOptions, SentryCliPluginOptions } from '@sentry/webpack-plugin'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import Copy, { CopyPluginOptions as CopyOptions, CopyPluginOptions } from 'copy-webpack-plugin'
import { Mode } from './config'
import path from 'path'
import { TerserOptions } from 'terser-webpack-plugin/types'
import fs from 'fs'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

type BundleAnalyzerOptions = BundleAnalyzerPlugin.Options
type WebpackPlugin = ((this: Compiler, compiler: Compiler) => void) | WebpackPluginInstance | any

const appDir = fs.realpathSync(process.cwd())

/**
 * Defines environment variables from process.env
 * @param envVars
 * @param mode
 */
function define(envVars: NodeJS.Dict<string> = {}, mode = 'development'): WebpackPlugin {
  return new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? mode),
    'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL ?? ''),
    ...envVars,
  })
}

/**
 * @param {CopyPluginOptions} options
 */
function copy(
  options: CopyPluginOptions = {
    patterns: [
      {
        from: '**/*',
        context: path.join(appDir, 'public'),
        noErrorOnMissing: true,
      },
    ],
  },
): WebpackPlugin {
  return new Copy(options)
}

/**
 * @param {BundleAnalyzerPlugin.Options} options
 */
function bundleAnalyzer(options: BundleAnalyzerPlugin.Options): WebpackPlugin {
  return new BundleAnalyzerPlugin(options)
}

/**
 * @param {DotenvPlugin.Options} options
 */
function dotenv(options: DotenvPlugin.Options = {}): WebpackPlugin {
  return new DotenvPlugin(options)
}

function nodePolyfill(options: NodePolyfillPlugin.Options = {}): WebpackPlugin {
  return new NodePolyfillPlugin(options)
}

/**
 * HTML Plugin
 * @param options
 * @param mode
 */
function html(
  options: HtmlWebpackPlugin.Options = {
    templateParameters: {},
  },
  mode: Mode = 'development',
): WebpackPlugin {
  return new HtmlWebpackPlugin({
    ...options,
    inject: true,
    cache: true,
    hash: mode === 'production',
    template: 'src/index.html',
    scriptLoading: 'module',
    showErrors: mode === 'development',
    minify:
      mode === 'production'
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
 *  @param mode
 *  @return {WebpackPlugin}
 */
function eslint(options: EslintPluginOptions = {}, mode: Mode = 'development'): WebpackPlugin {
  return new ESLintWebpack({
    cacheLocation: path.resolve(appDir, 'node_modules/.cache/.eslintcache'),
    cache: true,
    cwd: appDir,
    resolvePluginsRelativeTo: __dirname,
    extensions: ['tsx', 'ts', 'graphql'],
    failOnError: mode === 'production',
    failOnWarning: false,
    ...options,
  })
}

/**
 * Stylelint plugin
 * @param {StylelintPluginOptions} options
 * @param mode
 * @return {WebpackPlugin}
 */
function stylelint(options: StylelintPluginOptions = {}, mode: Mode = 'development'): WebpackPlugin {
  return new StylelintWebpack({
    extensions: ['less'],
    cacheLocation: path.resolve(appDir, 'node_modules/.cache/.stylelintcache'),
    customSyntax: 'postcss-less',
    cache: true,
    failOnError: mode === 'production',
    failOnWarning: false,
    ...options,
  })
}

/**
 * Cleans up output directory before build
 * @param options
 */
function clean(options: CleanPluginOption = {}): WebpackPlugin {
  return new CleanWebpackPlugin(options)
}

function terser(options: TerserOptions = {}): WebpackPlugin {
  return new TerserPlugin({
    terserOptions: { parse: { ecma: 2018 }, compress: { ecma: 5 }, ...options },
  })
}

function ignore(): WebpackPlugin {
  return new IgnorePlugin({ contextRegExp: /^\.\/locale$/, resourceRegExp: /moment$/ })
}

function automaticPrefetch(): WebpackPlugin {
  return new AutomaticPrefetchPlugin()
}

function contextReplacement(): WebpackPlugin {
  return new ContextReplacementPlugin(/power-assert-formatter[\\/]lib/, new RegExp('^\\./.*\\.js$'))
}

/**
 * @param {InjectManifestOptions} options
 */
function manifest(
  options: InjectManifestOptions = {
    dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
    exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    swSrc: 'src/service-worker.ts',
  },
): WebpackPlugin {
  return fs.existsSync(options.swSrc) && new InjectManifest(options)
}

function cssMinimizer(): WebpackPlugin {
  return new CssMinimizerPlugin()
}

/**
 * @param {WorkboxOptions} options
 */
function workbox(options: WorkboxOptions = { maximumFileSizeToCacheInBytes: 1e6 }): WebpackPlugin {
  return new GenerateSW(options)
}

/**
 * @param {SentryCliPluginOptions} options
 */
function sentry(options: SentryCliPluginOptions = { include: '.' }): WebpackPlugin {
  return new SentryCli(options)
}

/**
 * Extracts CSS into separate files
 * @param mode
 * @param options
 */
function miniCssExtract(mode: Mode, options: MiniCssPluginOptions = {}): WebpackPlugin {
  return new MiniCssExtract({
    ignoreOrder: true,
    runtime: true,
    ...options,
  })
}

/**
 * @param {Mode} mode
 */
const getPlugins = (mode: Mode = 'development') => ({
  automaticPrefetch,
  bundleAnalyzer,
  clean,
  cssMinimizer,
  copy,
  define: (options: NodeJS.Dict<string>) => define(options, mode),
  dotenv,
  contextReplacement,
  eslint: (options: EslintOptions = {}) => eslint(options, mode),
  html: (options: HtmlWebpackPlugin.Options = {}) => html(options, mode),
  ignore,
  manifest,
  miniCssExtract: (options: MiniCssPluginOptions = {}) => miniCssExtract(mode, options),
  nodePolyfill,
  sentry: (options: SentryCliPluginOptions) => sentry(options),
  stylelint: (options: StylelintPluginOptions = {}) => stylelint(options, mode),
  terser,
  workbox,
})

export type PluginConfiguration = {
  copy: CopyOptions
  html: HtmlOptions
  eslint: EslintOptions
  sentry: SentryOptions
  miniCss: MiniCssOptions
  clean: CleanOptions
  dotenv: DotenvOptions
  stylelint: StylelintOptions
  workbox: WorkboxOptions
  manifest: ManifestOptions
  provide: { [key: string]: string }
  bundleAnalyzer: BundleAnalyzerOptions
}

export { getPlugins }
