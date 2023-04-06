import { UserConfig } from "vite";
import vite from "./types";
declare function resolveBaseUrl(env: string | undefined): string;
declare function configureReact(config: UserConfig, plugins?: Partial<vite.PluginOptions>): UserConfig;
export { configureReact, resolveBaseUrl };
declare const _default: {
    configureReact: typeof configureReact;
};
export default _default;
//# sourceMappingURL=index.d.ts.map