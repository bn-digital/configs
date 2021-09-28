import { Configuration } from 'webpack'
import baseConfig, { packageJson } from './config'
import WebpackDevServer from 'webpack-dev-server'

const packageConfig = packageJson()

const config: Configuration & { devServer: WebpackDevServer.Configuration } = {
  ...baseConfig,
  optimization: { minimize: false },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    client: {
      logging: 'error',
      overlay: true,
    },
    proxy: packageConfig?.proxy
      ? [
          {
            target: packageConfig.proxy,
            context: ['/graphql', '/upload', '/uploads'],
          },
        ]
      : baseConfig.devServer?.proxy,
    allowedHosts: 'all',
    compress: false,
    historyApiFallback: true,
    hot: true,
    liveReload: true,
    open: true,
    port: 'auto',
  },
}

export default config
