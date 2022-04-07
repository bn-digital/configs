import { defineConfig, PluginOption, UserConfig } from 'vite';
import { VitePluginFontsOptions } from 'vite-plugin-fonts';
import { VitePWAOptions } from 'vite-plugin-pwa';
import { VitePluginRadarOptions } from 'vite-plugin-radar';
import { ViteSentryPluginOptions } from 'vite-plugin-sentry';
declare namespace Vite {
    type PluginOptions = {
        fonts: Partial<VitePluginFontsOptions>;
        analytics: Partial<VitePluginRadarOptions>;
        pwa: Partial<VitePWAOptions>;
        sentry: Partial<ViteSentryPluginOptions>;
    };
    type Plugins = (PluginOption | PluginOption[])[];
    type ConfigCallback = (plugins: Partial<Vite.PluginOptions>) => ReturnType<typeof defineConfig>;
    type ConfigMergeCallback = (config?: UserConfig, plugins?: Partial<Vite.PluginOptions>) => ReturnType<typeof defineConfig>;
}
export default Vite;
//# sourceMappingURL=config.d.ts.map