import { UserConfig } from 'vite';
import Vite from '../types/config';
declare type CommonOptions = Partial<Pick<UserConfig, 'server' | 'plugins' | 'define' | 'envPrefix' | 'root' | 'envDir' | 'base' | 'css'>>;
/**
 * @param {Vite.PluginOptions} options
 * @param {CommonOptions} config
 */
declare const commonOptions: (options?: CommonOptions, config?: Partial<Vite.PluginOptions>) => CommonOptions;
export { commonOptions };
//# sourceMappingURL=index.d.ts.map