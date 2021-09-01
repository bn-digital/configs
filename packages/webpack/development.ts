import { Configuration  } from 'webpack'
import baseConfig from './config'

const config: Configuration & { devServer: Record<string, unknown>} = {
  ...baseConfig,
  devtool: 'eval-cheap-module-source-map',
  optimization: { minimize: false },
  mode: 'development',
  devServer: {
    client: {
      logging: 'info',
      overlay: true,
      progress: true,
    },
    allowedHosts: 'all',
    compress: false,
    historyApiFallback: true,
    hot: 'only',
    liveReload: true,
    open: true,
    port: 0,
  },
}

export default config
