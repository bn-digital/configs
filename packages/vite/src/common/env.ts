import { loadEnv, UserConfig } from 'vite'

type EnvOptions = Partial<Pick<UserConfig, 'define' | 'envPrefix' | 'envDir'>>

export type NodeEnv = 'development' | 'production'

const prefixes = ['VITE_', 'WEBSITE_', 'REACT_']

const env: <T>(key: keyof typeof process.env, defaultValue?: T) => T | string = (key, defaultValue) =>
  process.env?.[key] ?? defaultValue ?? ''

const envOptions = (): EnvOptions => {
  const workingDir = process.cwd()
  const dotenv = loadEnv(env<NodeEnv | ''>('APP_ENV'), workingDir, prefixes)
  return {
    define: { 'process.env': dotenv, ...dotenv },
    envDir: workingDir,
    envPrefix: prefixes,
  }
}

export { env, envOptions }
