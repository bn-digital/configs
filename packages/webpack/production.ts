import { Configuration } from 'webpack'

const config: Configuration = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    removeEmptyChunks: true,
    minimize: true,
  },
}

export default config
