import WebpackDevServer from 'webpack-dev-server'
import { getPackageMetadata } from './getPackageMetadata'

const proxy = getPackageMetadata()?.proxy

const devServer: WebpackDevServer.Configuration = {
  proxy: proxy
    ? [
        {
          target: proxy,
          path: ['/graphql', '/upload', '/uploads'],
        },
      ]
    : undefined,
  allowedHosts: 'all',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  },
  compress: false,
  historyApiFallback: true,
  hot: true,
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
  },
  server: 'spdy',
  liveReload: true,
  open: true,
  port: 'auto',
}
export { devServer }
