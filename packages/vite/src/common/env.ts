import { UserConfig } from "vite"

import { EnvVar, ProcessEnv } from "../types"

type EnvOptions = Partial<Pick<UserConfig, "define" | "envPrefix" | "envDir">>

const prefixes = ["VITE_", "WEBSITE_", "REACT_", "APP_"]

function env<T extends EnvVar = EnvVar, V = ProcessEnv[T]>(key: T, defaultValue: ProcessEnv[T]): V {
  return (process.env[key as string] ?? defaultValue ?? "") as V
}

function envOptions(workingDir?: string): EnvOptions {
  return {
    envDir: workingDir,
    envPrefix: prefixes,
  }
}

export { env, envOptions }
