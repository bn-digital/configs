import { Configuration } from 'webpack'
import baseConfig from './config'

const config: Configuration = {
  ...baseConfig,
  mode: 'production',
  devtool: 'source-map',
}

export default config
