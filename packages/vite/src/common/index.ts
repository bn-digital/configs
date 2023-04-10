import { config } from "dotenv"
import fs from "fs"
import { join } from "path"

import vite from "../types"
import { env } from "./env"
import { serverOptions } from "./server"
import { cssOptions } from "./styles"

const commonOptions = (app: vite.App, options: vite.Config = {}): vite.Config => {
  const { css, server, ...otherOptions } = options
  return {
    server: serverOptions({ ...server, proxyUrl: app.package?.proxy }),
    css: cssOptions(css),
    ...otherOptions,
  }
}

/**
 * Read the package.json file from the working directory
 * @param workingDir
 */
export function readPackageJson(workingDir: string): vite.App["package"] {
  const filePath = join(workingDir, "package.json")
  return fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, "utf8")) : {}
}

/**
 * Get the application information
 */
function appInfo(): vite.App {
  const workingDir = process.cwd()
  const nodeEnv = env("NODE_ENV", "development")
  const packageData = readPackageJson(workingDir)
  config()

  const name = packageData.name.startsWith("@") ? packageData.name.split("/")[1] : packageData.name

  return {
    fqdn: env("DOMAIN", [name, "bndigital.dev"].join(".")),
    name: name[0].toUpperCase().concat(name.slice(1)),
    package: packageData,
    workingDir,
    isDev: nodeEnv === "development",
    isProd: nodeEnv === "production",
    mode: env("APP_ENV", "development") ?? (nodeEnv as vite.AppEnv),
    buildMode: nodeEnv === "development" ? "development" : "production",
  }
}

export { appInfo, commonOptions }
