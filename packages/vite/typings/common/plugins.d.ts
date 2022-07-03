declare function readPackageJson(workingDir?: string): {
    name: string;
    homepage?: string;
    proxy?: string;
    description: string;
};
declare function commonPlugins(options?: Partial<PluginOptions>): Plugins;
export { commonPlugins, readPackageJson };
//# sourceMappingURL=plugins.d.ts.map