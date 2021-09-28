import { Configuration } from 'webpack'
import path from 'path'
import fs from 'fs'
import yargs from "yargs";

export function packageJson(): Package.Metadata | null {
  return fs.existsSync(path.join(process.cwd(), 'package.json'))
    ? JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'))
    : null
}

export function cliArgs() {
  return yargs(process.argv.slice(2))
    .options({
      mode: { type: 'string', default: 'development' },
    })
    .parseSync()
}

export type Mode = 'production' | 'development'

const config: Configuration = {
  stats: 'summary',
  output: {
    path: path.join(process.cwd(), 'build'),
    filename: `scripts/[name]${process.env.NODE_ENV === 'production' ? '.[contenthash:8]' : ''}.js`,
    chunkFilename: `scripts/[name]${process.env.NODE_ENV === 'production' ? '.[contenthash:8]' : ''}.chunk.js`,
    assetModuleFilename: 'assets/[name].[hash][ext]',
  },
  resolve: {
    alias: { src: path.join(process.cwd(), 'src') },
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  experiments: {
    asset: true,
    layers: true,
  },
}
export default config
