import { UserConfig } from 'vite'

import { readPackageJson } from './plugins'

const STRAPI_URLS: Readonly<string[]> = [
  '_health',
  'admin',
  'api',
  'config-sync',
  'content-manager',
  'content-type-builder',
  'email',
  'email-designer',
  'graphql',
  'graphs-builder',
  'i18n',
  'secrets',
  'sitemap',
  'upload',
  'uploads',
  'users-permissions',
] as const

type ServerOptions = Partial<Pick<UserConfig, 'server'>>

const serverOptions = (options?: ServerOptions): ServerOptions => {
  const packageJson = readPackageJson()
  const proxy = packageJson?.proxy ? { [`^/(${STRAPI_URLS.join('|')})(.*)`]: packageJson.proxy.replace('localhost', '127.0.0.1') } : undefined
  return {
    server: {
      port: Number.parseInt(process.env.WEBSITE_PORT ?? '8080'),
      strictPort: false,
      fs: {
        strict: false,
      },
      proxy,
      ...options,
    },
  }
}

export { serverOptions }
