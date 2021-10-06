import { Configuration } from 'webpack'
import path from 'path'
import fs from 'fs'
import yargs from 'yargs'
import merge from 'webpack-merge'
import { getPlugins } from './plugins'
import WebpackDevServer from 'webpack-dev-server'

const appDir = fs.realpathSync(process.cwd())

const getPackageMetadata = (): Package.Metadata | null => {
  if (!fs.existsSync(path.join(appDir, 'package.json'))) {
    console.warn(`No package.json detected in ${appDir}`)
    return null
  }
  try {
    return JSON.parse(fs.readFileSync(path.join(appDir, 'package.json'), 'utf-8'))
  } catch (e) {
    console.error(e)
    return null
  }
}

const getCliArgs = (): Webpack.CliArgs =>
  yargs(process.argv.slice(2))
    .options({
      mode: { type: 'string', default: 'development' },
    })
    .parseSync()

export type Mode = 'production' | 'development'

const getOutputs = (mode: Mode) => ({
  clean: true,
  path: path.join(appDir, 'build'),
  filename: `scripts/[name]${mode === 'production' ? '.[contenthash:8]' : ''}.js`,
  chunkFilename: `scripts/[name]${mode === 'production' ? '.[contenthash:8]' : ''}.chunk.js`,
  assetModuleFilename: 'assets/[name].[hash][ext]',
  pathinfo: mode === 'development',
})

const base: Partial<Configuration> = {
  stats: 'normal',
  resolve: {
    alias: { src: path.join(appDir, 'src') },
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  cache: {
    type: 'filesystem',
    hashAlgorithm: 'md5',
    buildDependencies: {
      defaultWebpack: ['webpack/lib/'],
      config: [__filename],
      tsconfig: [path.join(process.cwd(), 'tsconfig.json')].filter(f => fs.existsSync(f)),
    },
    cacheLocation: path.join(appDir, '.cache', 'webpack'),
  },
  experiments: {
    asset: true,
    layers: true,
    outputModule: false,
    cacheUnaffected: true,
  },
  plugins: [],
}

const production: Configuration = {
  mode: 'production',
  devtool: 'source-map',
  stats: 'summary',
  optimization: { minimizer: [getPlugins('production').terser()], minimize: true },
  plugins: [],
}

const development: Partial<Configuration & { devServer: WebpackDevServer.Configuration }> = {
  optimization: { minimize: false },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [],
  devServer: {
    client: {
      logging: 'error',
      overlay: true,
    },
    proxy: getPackageMetadata()?.proxy
      ? [
          {
            target: getPackageMetadata()?.proxy,
            context: ['/graphql', '/upload', '/uploads'],
          },
        ]
      : undefined,
    allowedHosts: 'all',
    compress: false,
    historyApiFallback: true,
    hot: true,
    liveReload: true,
    open: true,
    port: 'auto',
  },
}

const getConfig: (mode: Mode) => Partial<Configuration> = mode =>
  merge(base, {
    ...(mode === 'production' ? production : development),
    output: getOutputs(mode),
  })

export { getConfig, getCliArgs, getPackageMetadata }
