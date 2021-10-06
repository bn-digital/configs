import { mergeWithReact } from './react'
import { config } from 'dotenv'
import * as fs from 'fs'

fs.existsSync('.env') && config()
fs.existsSync(`.env.${process.env.NODE_ENV ?? 'development'}`) && config()

export { mergeWithReact }

module.exports = {
  mergeWithReact,
}
