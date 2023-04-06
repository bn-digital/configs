import { config } from "dotenv"
import fs from "fs"
import { join } from "path"

import vite from "../types"
import { env } from "./env"
import { commonPlugins } from "./plugins"
import { serverOptions } from "./server"
import { cssOptions } from "./styles"
const commonOptions = (app: vite.App, options: vite.Config = { plugins: [] }): vite.Config => {
  const { plugins, css, server } = options
  return {
    server: serverOptions({ ...server, proxyUrl: app.package?.proxy }),
    css: cssOptions(css),
    plugins: commonPlugins(app, options).concat(plugins),
  }
}

function readPackageJson(workingDir: string): vite.App["package"] {
  return JSON.parse(fs.readFileSync(join(workingDir, "package.json"), "utf8"))
}

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
