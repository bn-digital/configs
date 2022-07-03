import { UserConfig } from 'vite';
declare type CommonOptions = Partial<Pick<UserConfig, 'server' | 'plugins' | 'define' | 'envPrefix' | 'root' | 'envDir' | 'base' | 'css'>>;
/**
 * @param {PluginOptions} options
 * @param {CommonOptions} config
 */
declare const commonOptions: (options?: CommonOptions, config?: Partial<PluginOptions>) => CommonOptions;
export { commonOptions };
//# sourceMappingURL=index.d.ts.map