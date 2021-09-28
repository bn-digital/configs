import { Configuration } from 'webpack'
import baseConfig from './config'
import { terserPlugin } from './plugins'

const config: Configuration = {
  ...baseConfig,
  mode: 'production',
  bail: true,
  devtool: 'source-map',
  stats: 'detailed',
  optimization: { minimizer: [terserPlugin()], minimize: true },
}

export default config
