import vite from "../types"

const STRAPI_URLS: Readonly<string[]> = [
  "_health",
  "admin",
  "api",
  "config-sync",
  "content-manager",
  "content-type-builder",
  "email",
  "email-designer",
  "graphql",
  "graphs-builder",
  "i18n",
  "import-export-entries",
  "menus",
  "secrets",
  "sitemap",
  "upload",
  "uploads",
  "users-permissions",
] as const

const serverOptions = (options?: vite.ServerOptions): vite.Config["server"] => {
  const proxy =
    options?.proxy ??
    (options?.proxyUrl
      ? { [`^/(${STRAPI_URLS.join("|")})(.*)`]: options.proxyUrl.replace("localhost", "127.0.0.1") }
      : undefined)
  return {
    port: Number.parseInt(process.env.WEBSITE_PORT ?? "8080"),
    strictPort: false,
    fs: {
      strict: false,
    },
    proxy,
    ...options,
  }
}

export { serverOptions }
