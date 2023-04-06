import postcssPlugins from "@bn-digital/postcss-config"

import vite from "../types"
const cssOptions = <T extends vite.Config["css"] = vite.Config["css"]>(options: T): T => {
  return {
    postcss: { plugins: postcssPlugins },
    ...options,
  }
}

export { cssOptions }
