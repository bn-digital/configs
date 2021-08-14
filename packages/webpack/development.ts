import { Configuration } from 'webpack'

const config: Configuration & { devServer: any } = {
  devtool: 'cheap-module-source-map',
  optimization: { minimize: false },
  mode: 'development',
  devServer: {
    port: 0,
    historyApiFallback: true,
    open: true,
    hot: true,
    liveReload: true,
    compress: true,
  },
}

export default config
