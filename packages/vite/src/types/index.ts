import { type Config as SvgrOptions } from "@svgr/core"
import { type PluginOption, type UserConfig } from "vite"
import { type UserPluginConfig } from "vite-plugin-checker/dist/esm/types"
import { type VitePluginFontsOptions } from "vite-plugin-fonts"
import { type Options as ViteGraphqlOptions } from "vite-plugin-graphql-codegen"
import { type Options as OpenGraphOptions } from "vite-plugin-open-graph"
import { type VitePWAOptions } from "vite-plugin-pwa"
import { type VitePluginRadarOptions } from "vite-plugin-radar"
import { type NodeEnv } from "./env"

namespace vite {
  export type Config = Partial<UserConfig & PluginOptions>

  export type AppEnv = NodeEnv | "staging"
  export type LogLevel = "warning" | "error"

  type Enablement = { enabled?: boolean }

  export interface App {
    isDev: boolean
    isProd: boolean
    mode: AppEnv
    buildMode: NodeEnv
    workingDir: string
    name: string
    fqdn: string
    package: { name: string; domain: string; version?: string; proxy?: string } & object
  }

  export type PluginOptions = {
    analytics?: Partial<VitePluginRadarOptions>
    fonts?: Partial<VitePluginFontsOptions>
    lint?: Partial<Enablement & UserPluginConfig>
    pwa?: Partial<Enablement & VitePWAOptions>
    graphql?: Partial<Enablement & ViteGraphqlOptions>
    openGraph?: Partial<Enablement & OpenGraphOptions>
    react?: Partial<ReactOptions>
    buildInfo?: Partial<Enablement & { meta: Record<string, string | number | boolean> }>
  }

  export type ReactOptions = {
    swc?: Enablement
    svg?: Enablement & SvgrOptions
  }

  export type ServerOptions = UserConfig["server"] & { proxyUrl: string | undefined }

  export type Plugins = (PluginOption | PluginOption[])[]
}

export default vite

export * from "./env"
