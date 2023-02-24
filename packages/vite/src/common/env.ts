import { join } from 'node:path'

import { UserConfig } from 'vite'
import { config } from 'dotenv'

type EnvOptions = Partial<Pick<UserConfig, 'define' | 'envPrefix' | 'envDir'>>

const prefixes = ['VITE_', 'WEBSITE_', 'REACT_', 'APP_']
const workingDir = process.cwd()
config({ path: join(workingDir, '.env') })
const env: <T>(key: keyof typeof process.env, defaultValue?: T) => T | string = (key, defaultValue) =>
  process.env?.[key] ?? defaultValue ?? ''

const envOptions = (): EnvOptions => {
  return {
    envDir: workingDir,
    envPrefix: prefixes,
  }
}

export { env, envOptions }
