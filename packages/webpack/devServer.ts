import WebpackDevServer from 'webpack-dev-server'
import { getPackageMetadata } from './getPackageMetadata'

const proxy = getPackageMetadata()?.proxy

const devServer: WebpackDevServer.Configuration = {
  proxy: proxy
    ? [
        {
          target: proxy,
          context: ['/graphql', '/upload', '/uploads'],
        },
      ]
    : undefined,
  allowedHosts: 'all',
  compress: false,
  historyApiFallback: true,
  hot: true,
  client: { overlay: false },
  liveReload: true,
  open: true,
  port: 'auto',
}
export { devServer }
