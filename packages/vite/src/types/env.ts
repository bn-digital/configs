export type NodeEnv = "development" | "production"
export type EnvVar = keyof ProcessEnv &
  (string | `APP_${string}` | `VITE_${string}` | `WEBSITE_${string}` | `REACT_${string}`)

export declare interface ProcessEnv {
  readonly NODE_ENV: NodeEnv
  readonly WEBSITE_PORT: number
  readonly APP_ENV: NodeEnv
  readonly APP_NAME: string
  readonly APP_VERSION: string
  readonly DOMAIN: string
  readonly KUBERNETES_CLUSTER: string
  readonly API_URL: string
  readonly GOOGLE_ANALYTICS_ID: string
  readonly GOOGLE_TAG_MANAGER_ID: string
}

export declare interface ImportMetaEnv extends ProcessEnv {
  readonly WEBSITE_API_URL: string
}
