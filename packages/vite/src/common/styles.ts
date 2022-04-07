import postcssPlugins from '@bn-digital/postcss-config'
import { UserConfig } from 'vite'

type CssOptions = Partial<Pick<UserConfig, 'css'>>

const cssOptions = (options?: CssOptions): CssOptions => {
  return {
    css: {
      postcss: { plugins: postcssPlugins },
      ...options?.css,
    },
  }
}

export { cssOptions }
