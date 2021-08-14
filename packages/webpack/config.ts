import { Configuration } from 'webpack'
import path from 'path'

const config: Configuration = {
  target: 'web',
  output: {
    clean: true,
    path: path.resolve(process.cwd(), 'build'),
    filename: '[name].[contenthash:8][ext]',
    chunkFilename: 'scripts/[id].[chunkhash][ext]',
    assetModuleFilename: 'assets/[hash][ext]',
  },
  resolve: {
    fallback: { assert: false },
    extensions: ['.ts', '.js', '.tsx', '.jsx', '*'],
  },
  experiments: {
    asset: true,
    layers: true,
  },
  cache: { type: 'memory' },
}

export default config
