type EnvVariableName = `WEBSITE_${string}`

interface ProcessEnv {
  [key: EnvVariableName]: string | number | boolean
}

interface ImportMeta<T extends ProcessEnv> {
  readonly env: T & ImportMetaEnv
}
