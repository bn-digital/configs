/// <reference types="vite/src/client" />
declare global {
  type EnvVariableName = `WEBSITE_${string}`

  interface ImportMetaEnv {
    [key: EnvVariableName]: string | number | boolean | null | undefined
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

}
