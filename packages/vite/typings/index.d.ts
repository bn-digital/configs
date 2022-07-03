import { defineConfig, type PluginOption, type UserConfig } from 'vite';
import type { VitePluginFontsOptions } from 'vite-plugin-fonts';
import type { VitePWAOptions } from 'vite-plugin-pwa';
import type { VitePluginRadarOptions } from 'vite-plugin-radar';
import type { ViteSentryPluginOptions } from 'vite-plugin-sentry';
declare global {
    type EnvVariableName = `WEBSITE_${string}`;
    type Browsers = `safari${number}` | `opera${number}` | `chrome${number}` | `edge${number}` | `ios${number}` | `ie${number}`;
    interface ImportMetaEnv {
        [key: EnvVariableName]: string | number | boolean | null | undefined;
    }
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
    type PluginOptions = {
        fonts: Partial<VitePluginFontsOptions>;
        analytics: Partial<VitePluginRadarOptions>;
        pwa: Partial<VitePWAOptions>;
        sentry: Partial<ViteSentryPluginOptions>;
        browsers: Browsers[];
        sourceMaps: boolean;
        react: Partial<ReactOptions>;
    };
    type ReactOptions = {
        antd: boolean;
    };
    type Plugins = (PluginOption | PluginOption[])[];
    type ConfigCallback = (plugins: Partial<PluginOptions>) => ReturnType<typeof defineConfig>;
    type ConfigMergeCallback = (config?: UserConfig, plugins?: Partial<PluginOptions>) => ReturnType<typeof defineConfig>;
}
declare const configureReact: ConfigMergeCallback;
declare const configureStaticHtml: ConfigMergeCallback;
export { configureReact, configureStaticHtml, configureReact as default };
//# sourceMappingURL=index.d.ts.map