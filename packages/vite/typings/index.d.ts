import { UserConfig } from "vite";
import vite from "./types";
/**
 * Resolve the base URL for the application depending on the environment
 * @param appEnv
 */
declare function resolveBaseUrl(appEnv?: vite.AppEnv): string;
declare function configureReact(config: UserConfig, plugins?: Partial<vite.PluginOptions>): UserConfig;
export { configureReact, resolveBaseUrl };
export default configureReact;
//# sourceMappingURL=index.d.ts.map