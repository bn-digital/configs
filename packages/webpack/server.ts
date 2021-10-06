import { Configuration } from 'webpack'

export const config: Configuration = {
  entry: './src/server.ts',
  target: 'node',
  externalsPresets: { node: true },
}

module.exports = config
