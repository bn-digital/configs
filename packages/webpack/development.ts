import { Configuration } from 'webpack'
import baseConfig from './config'
import fs from 'fs'
import path from 'path'

let packageJson: { proxy?: string } = { proxy: 'http://localhost:1337' }

if (fs.existsSync(path.join(process.cwd(), 'package.json'))) {
  packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'))
}
const config: Configuration = {
  ...baseConfig,
  devtool: 'eval',
  optimization: { minimize: false },
  mode: 'development',
  devServer: {
    client: {
      overlay: true,
    },
    proxy: packageJson.proxy
      ? [
          {
            target: packageJson.proxy,
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
