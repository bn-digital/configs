import { UserConfig } from 'vite'

type PathsOptions = Partial<Pick<UserConfig, 'base' | 'root'>>
const pathsOptions = (options?: PathsOptions): PathsOptions => {
  return {
    base: '',
    ...(options ?? {}),
  }
}

export { pathsOptions }
