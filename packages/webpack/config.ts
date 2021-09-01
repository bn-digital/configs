import { Configuration } from 'webpack'
import path from 'path'

const config: Configuration = {
  target: 'web',
  entry: './src/index.tsx',
  stats: 'errors-warnings',
  cache: { type: 'memory' },
  output: {
    path: path.join(process.cwd(), 'build'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: 'scripts/[id].[chunkhash].js',
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
}

export default config
