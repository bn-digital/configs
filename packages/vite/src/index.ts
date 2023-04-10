import { mergeConfig, UserConfig } from "vite"

import * as process from "process"
import { readPackageJson } from "./common"
import { env } from "./common/env"
import { withReact } from "./react"
import vite from "./types"

/**
 * Resolve the base URL for the application depending on the environment
 * @param appEnv
 */
function resolveBaseUrl(appEnv: vite.AppEnv = "development"): string {
  if (appEnv === "development") return "/"
  const { name, homepage = "" } = readPackageJson(process.cwd())
  if (homepage) return homepage

  const domain = env("DOMAIN", "")
  if (domain) return `https:://${domain}/`

  const appName = env("APP_NAME", name.split("/")[0].replace("@", ""))
  if (appName || appEnv === "staging") return `https://${appName}.bndigital.dev/`

  return "/"
}

function configureReact(config: UserConfig, plugins: Partial<vite.PluginOptions> = {}): UserConfig {
  return mergeConfig(config, withReact(plugins))
}

export { configureReact, resolveBaseUrl }
export default { configureReact }
