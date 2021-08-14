import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'
import production from './production'
import development from './development'
import yargs from 'yargs/yargs'
import { babel, ejs, fonts, images, less, svg } from './rules'
import {
  automaticPrefetchPlugin,
  eslintPlugin,
  miniCssExtractPlugin,
  htmlPlugin,
  stylelintPlugin,
  WebpackPlugin,
  dotenvPlugin,
  definePlugin,
} from './plugins'
import { Certificate, createCA, createCert } from 'mkcert'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { config } from 'dotenv'

config({ path: process.cwd() })

const argv = yargs(process.argv.slice(2))
  .options({
    mode: { type: 'string', default: 'development' },
  })
  .parseSync()


/**
 * Creates root authority certificate
 */
const generateCa = async () =>
  await createCA({
    organization: 'BN Digital',
    countryCode: 'UK',
    state: 'JS',
    locality: 'London',
    validityDays: 365,
  })

/**
 * Creates certificate bundled with root authority chain
 */
const generateTls = async (): Promise<Certificate> =>
  await generateCa().then(ca =>
    createCert({
      domains: ['127.0.0.1', 'localhost'],
      validityDays: 365,
      caKey: ca.key,
      caCert: ca.cert,
    }).then(tls => ({
      key: tls.key,
      cert: tls.cert,
      cacert: ca.cert,
    })),
  )

type WebpackCustomConfiguration = {
  context: string
  env: NodeJS.Dict<string>
  devServer: {}
  html: HtmlWebpackPlugin.Options
  plugins: WebpackPlugin[]
}

/**
 * Configures Webpack with multiple
 * @param {Partial<Configuration>} configuration
 * @param options
 */
function mergeWithReact(configuration: Configuration, options: Partial<WebpackCustomConfiguration>) {
  const envConfiguration =
    process.env.NODE_ENV === 'production' || argv.mode === 'production'
      ? production
      : {
          ...development,
          devServer: { ...development.devServer, ...(options?.devServer ?? {}) },
        }
  const baseConfiguration: Configuration = {
    ...envConfiguration,
    context: options?.context ?? envConfiguration?.context,
    entry: './src/index.tsx',
    resolve: {
      ...envConfiguration?.resolve,
      ...configuration?.resolve,
    },
    output: {
      ...envConfiguration?.output,
      ...configuration?.output,
    },
    module: {
      rules: [fonts, svg, images, less, babel, ejs],
    },
    plugins: [
      dotenvPlugin(),
      definePlugin(options.env),
      eslintPlugin(),
      stylelintPlugin(),
      automaticPrefetchPlugin(),
      miniCssExtractPlugin(),
      htmlPlugin(options?.html ?? {}),
    ],
  }
  if (options?.plugins) {
    options.plugins.forEach(instance => baseConfiguration.plugins?.push(instance))
  }
  return merge(baseConfiguration, configuration)
}

export { mergeWithReact, generateTls }
