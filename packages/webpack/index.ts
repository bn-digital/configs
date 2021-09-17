import { Configuration } from 'webpack'
import yargs from 'yargs'
import { mergeWithReact } from './react'
import { config } from 'dotenv'
import { Options as HtmlOptions } from 'html-webpack-plugin'
import { Options as EslintOptions } from 'eslint-webpack-plugin'
import { Options as StylelintOptions } from 'stylelint-webpack-plugin'
import { Options as DotenvOptions } from 'dotenv-webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { Options as CleanOptions } from 'clean-webpack-plugin'
import { GenerateSWOptions as WorkboxOptions, InjectManifestOptions as ManifestOptions } from 'workbox-webpack-plugin'

config()

const args = yargs(process.argv.slice(2))
  .options({
    mode: { type: 'string', default: 'development' },
  })
  .parseSync()

export type WebpackCustomConfiguration = Pick<Configuration, 'plugins'> & {
  html: HtmlOptions
  eslint: EslintOptions
  clean: CleanOptions
  dotenv: DotenvOptions
  stylelint: StylelintOptions
  workbox: WorkboxOptions
  manifest: ManifestOptions
  provide: { [key: string]: string }
  bundleAnalyzer: BundleAnalyzerPlugin.Options
}

module.exports = { react: mergeWithReact({ mode: args.mode as 'development' | 'production' }) }
