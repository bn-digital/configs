import postcssPlugins from '@bn-digital/postcss-config'
import { CSSOptions, UserConfig } from 'vite'

type CssOptions = Pick<UserConfig, 'css'>

const cssOptions = (options?: CSSOptions): CssOptions => {
  return {
    css: {
      postcss: { plugins: postcssPlugins },
      ...options,
    },
  }
}

export { cssOptions }
