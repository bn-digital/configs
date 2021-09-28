import { Configuration } from 'webpack'

export const config: Configuration = {
  entry: 'server.ts',
  target: 'node',
  externalsPresets: { node: true },
}

module.exports = config
