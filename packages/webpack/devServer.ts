import WebpackDevServer from 'webpack-dev-server'
import { getPackageMetadata } from './getPackageMetadata'

const proxy = getPackageMetadata()?.proxy

const target: import('http-proxy-middleware').Options | undefined = proxy
  ? {
      target: proxy.replace('localhost', '127.0.0.1'),
      changeOrigin: true,
      ws: true,
      xfwd: true,
      cookieDomainRewrite: 'localhost',
      onProxyReq: proxyReq => {
        if (proxyReq.getHeader('origin')) {
          proxyReq.setHeader('origin', proxy)
        }
      },
    }
  : undefined

const devServer: WebpackDevServer.Configuration = {
  proxy: target && {
    '/admin': target,
    '/graphql': target,
    '/api': target,
    '/upload': target,
    '/auth': target,
  },
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
  server: 'http',
  liveReload: true,
  open: true,
  port: 'auto',
}
export { devServer }
