import Vite from '../types/config';
declare function readPackageJson(workingDir?: string): {
    name: string;
    homepage?: string;
    proxy?: string;
    description: string;
};
declare function commonPlugins(options?: Partial<Vite.PluginOptions>): Vite.Plugins;
export { commonPlugins, readPackageJson };
//# sourceMappingURL=plugins.d.ts.map