import { UserConfig } from "vite";
import vite from "./types";
/**
 * Resolve the base URL for the application depending on the environment
 * @param appEnv
 */
declare function resolveBaseUrl(appEnv?: vite.AppEnv): string;
declare function configureReact(config: UserConfig, plugins?: Partial<vite.PluginOptions>): UserConfig;
export { configureReact, resolveBaseUrl };
declare const _default: {
    configureReact: typeof configureReact;
};
export default _default;
//# sourceMappingURL=index.d.ts.map