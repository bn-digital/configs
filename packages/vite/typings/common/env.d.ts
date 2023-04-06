import { UserConfig } from "vite";
import { EnvVar, ProcessEnv } from "../types";
type EnvOptions = Partial<Pick<UserConfig, "define" | "envPrefix" | "envDir">>;
declare function env<T extends EnvVar = EnvVar, V = ProcessEnv[T]>(key: T, defaultValue: ProcessEnv[T]): V;
declare function envOptions(workingDir?: string): EnvOptions;
export { env, envOptions };
//# sourceMappingURL=env.d.ts.map