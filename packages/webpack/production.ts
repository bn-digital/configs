import { Configuration } from 'webpack'
import baseConfig from './config'
import { terserPlugin } from './plugins'

const config: Configuration = {
  ...baseConfig,
  mode: 'production',
  devtool: 'source-map',
  optimization: { minimizer: [terserPlugin()], minimize: true },
}

export default config
