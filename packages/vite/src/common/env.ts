import { UserConfig } from 'vite'

type EnvOptions = Partial<Pick<UserConfig, 'define' | 'envPrefix' | 'envDir'>>

const envOptions = (options?: EnvOptions): EnvOptions => {
  const workingDir = process.cwd()
  return {
    define: {
      'process.env': {},
    },
    envDir: workingDir,
    envPrefix: 'WEBSITE_',
    ...options,
  }
}

export { envOptions }
