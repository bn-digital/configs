import { mergeConfig, UserConfig } from "vite"

import { withReact } from "./react"
import vite from "./types"

function resolveBaseUrl(env: string | undefined) {
  switch (env) {
    case "production":
      return `https://${process.env.DOMAIN}/`
    case "staging":
      return process.env.APP_NAME ? `https://${process.env.APP_NAME}.bndigital.dev/` : "/"
    case "development":
      return "http://localhost:8080/"
    default:
      return "/"
  }
}

function configureReact(config: UserConfig, plugins: Partial<vite.PluginOptions> = {}): UserConfig {
  return mergeConfig(config, withReact(plugins))
}

export { configureReact, resolveBaseUrl }
export default { configureReact }
