type EnvVariableName = `WEBSITE_${string}`

export interface ProcessEnv {
  [key: EnvVariableName]: string | number | boolean
}

export interface ImportMeta<T extends ProcessEnv> {
  readonly env: T & ImportMetaEnv
}
