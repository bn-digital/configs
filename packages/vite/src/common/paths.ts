import path from 'path'
import { UserConfig } from 'vite'

type PathsOptions = Partial<Pick<UserConfig, 'publicDir' | 'base' | 'resolve' | 'root'>>

const workingDir = process.cwd()

const pathsOptions = (): PathsOptions => {
  return {
    resolve: { alias: { src: path.join(workingDir, 'src') } },
    base: '/',
  }
}

export { pathsOptions }
