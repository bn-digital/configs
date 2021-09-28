import { Configuration } from 'webpack'
import { mergeWithReact } from './react'
import { config } from 'dotenv'
import { Options as HtmlOptions } from 'html-webpack-plugin'
import { Options as EslintOptions } from 'eslint-webpack-plugin'
import { Options as StylelintOptions } from 'stylelint-webpack-plugin'
import { Options as DotenvOptions } from 'dotenv-webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { Options as CleanOptions } from 'clean-webpack-plugin'
import { GenerateSWOptions as WorkboxOptions, InjectManifestOptions as ManifestOptions } from 'workbox-webpack-plugin'
import { SentryCliPluginOptions as SentryOptions } from '@sentry/webpack-plugin'

config()

type LoadersConfiguration = { template: 'ejs' | null; jsx: boolean }
export type WebpackCustomConfiguration = Pick<Configuration, 'plugins'> & {
  loaders: Partial<LoadersConfiguration>
  html: HtmlOptions
  eslint: EslintOptions
  sentry: SentryOptions
  clean: CleanOptions
  dotenv: DotenvOptions
  stylelint: StylelintOptions
  workbox: WorkboxOptions
  manifest: ManifestOptions
  provide: { [key: string]: string }
  bundleAnalyzer: BundleAnalyzerPlugin.Options
}

export const react = mergeWithReact()

module.exports = {
  react: mergeWithReact({}, {}),
}
