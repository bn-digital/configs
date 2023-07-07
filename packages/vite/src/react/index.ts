import { default as reactPlugin } from "@vitejs/plugin-react"
import { default as reactSwcPlugin } from "@vitejs/plugin-react-swc"
import { UserConfig } from "vite"
import { default as svgrPlugin } from "vite-plugin-svgr"

import { appInfo, commonOptions } from "../common"
import { envOptions } from "../common/env"
import { commonPlugins } from "../common/plugins"
import { resolveBaseUrl } from "../index"
import vite from "../types"

function reactPlugins(
  { svg, swc }: Partial<vite.ReactOptions> = { svg: { enabled: true }, swc: { enabled: false } }
): vite.Plugins {
  return [
    swc?.enabled ? reactSwcPlugin() : reactPlugin(),
    svg?.enabled &&
      svgrPlugin({
        svgrOptions: { svgo: false },
        esbuildOptions: { minify: true },
      }),
  ]
}

function withReact(config: vite.Config): UserConfig|Promise<UserConfig> {
  const app = appInfo()
  return {
    appType: "spa",
    experimental: {
      renderBuiltUrl(
        filename: string,
        { type }: { hostId: string; hostType: "js" | "css" | "html"; type: "public" | "asset" }
      ) {
        return type === "public" ? resolveBaseUrl(app.mode).concat(filename) : { relative: true }
      },
    },
    build: {
      write: true,
      ssrManifest: true,
      chunkSizeWarningLimit: 1024,
      cssCodeSplit: true,
      emptyOutDir: true,
      manifest: true,
      modulePreload: true,
      assetsInlineLimit: 1024 * 4,
      minify: "terser",
      outDir: "build",
      sourcemap: true,
      target: "esnext",
    },
    ...commonOptions(app, {
      css: { preprocessorOptions: { less: { javascriptEnabled: true } } },
      plugins: [...commonPlugins(app, config), ...reactPlugins(config?.react)].filter(Boolean),
      ...envOptions(app.workingDir),
      ...config,
    }),
  }
}

export { withReact }









