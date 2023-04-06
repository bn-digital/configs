"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonPlugins = void 0;
const vite_1 = require("vite");
const vite_plugin_checker_1 = __importDefault(require("vite-plugin-checker"));
const vite_plugin_fonts_1 = __importDefault(require("vite-plugin-fonts"));
const vite_plugin_info_1 = __importDefault(require("vite-plugin-info"));
const vite_plugin_pwa_1 = require("vite-plugin-pwa");
const vite_plugin_radar_1 = __importDefault(require("vite-plugin-radar"));
const vite_tsconfig_paths_1 = __importDefault(require("vite-tsconfig-paths"));
function resolveAnalyticsOptions({ analytics = undefined, gtm = undefined, ...extraOptions }) {
    return {
        analytics: process.env.GOOGLE_ANALYTICS_ID
            ? { disable: false, id: process.env.GOOGLE_ANALYTICS_ID, ...analytics }
            : analytics,
        gtm: process.env.GOOGLE_TAG_MANAGER_ID ? { id: process.env.GOOGLE_TAG_MANAGER_ID, ...gtm } : gtm,
        ...extraOptions,
    };
}
function resolvePWAOptions(options) {
    return {
        injectRegister: "auto",
        strategies: "injectManifest",
        minify: true,
        ...options,
    };
}
function resolveCheckPluginOptions(app, overrides) {
    const logLevel = app.mode !== "development" ? ["error"] : ["error", "warning"];
    return (0, vite_plugin_checker_1.default)({
        enableBuild: true,
        overlay: { position: "tr", initialIsOpen: false },
        eslint: {
            lintCommand: 'eslint --format=pretty "./src/**/*.{ts,tsx}"',
            dev: {
                overrideConfig: {
                    cache: true,
                    fix: true,
                    cacheLocation: "node_modules/.cache/eslintcache",
                    baseConfig: {
                        extends: "@bn-digital/eslint-config/react",
                        ignorePatterns: ["src/graphql/index.tsx", "src/types/graphql.d.ts"],
                    },
                },
                logLevel,
            },
            ...overrides.eslint,
        },
        stylelint: {
            dev: {
                logLevel,
                overrideConfig: {
                    cache: true,
                    allowEmptyInput: true,
                    fix: true,
                    cwd: app.workingDir,
                    ignorePath: ["build", "node_modules", ".cache", "dist", "dev-dist"],
                    cacheLocation: "node_modules/.cache/stylelintcache",
                    config: { extends: "@bn-digital/stylelint-config/less" },
                },
            },
            lintCommand: "stylelint src/**/*.{less,css}",
            ...overrides.stylelint,
        },
        typescript: app.mode === "development" ? { root: app.workingDir, buildMode: false } : false,
        terminal: app.mode === "development",
        ...overrides,
    });
}
function commonPlugins(app, pluginOptions) {
    const plugins = [(0, vite_1.splitVendorChunkPlugin)(), (0, vite_tsconfig_paths_1.default)({ root: app.workingDir })];
    if (pluginOptions.lint) {
        const { enabled, ...checkOptions } = pluginOptions.lint;
        enabled && plugins.push(resolveCheckPluginOptions(app, checkOptions));
    }
    if (pluginOptions.buildInfo) {
        const { enabled, ...buildInfoOptions } = pluginOptions.buildInfo;
        enabled && plugins.push((0, vite_plugin_info_1.default)({ meta: buildInfoOptions.meta }));
    }
    const fontsOptions = pluginOptions?.fonts;
    fontsOptions && plugins.push((0, vite_plugin_fonts_1.default)(fontsOptions));
    const analyticsOptions = pluginOptions?.analytics && resolveAnalyticsOptions(pluginOptions.analytics);
    analyticsOptions && plugins.push((0, vite_plugin_radar_1.default)(analyticsOptions));
    if (pluginOptions?.pwa) {
        const pwaOptions = resolvePWAOptions({
            injectRegister: "inline",
            registerType: "autoUpdate",
            includeManifestIcons: true,
            mode: app.buildMode,
            ...pluginOptions?.pwa,
            workbox: {
                sourcemap: app.isDev,
                mode: app.buildMode,
                ignoreURLParametersMatching: [/\/admin$/, /\/graphql/, /\/upload$/, /\/api$/],
                disableDevLogs: app.isProd,
                cleanupOutdatedCaches: true,
                runtimeCaching: [
                    {
                        urlPattern: ({ request }) => ["image", "font", "script", "video", "style"].find(it => request.destination === it),
                        method: "GET",
                        handler: "StaleWhileRevalidate",
                        options: { cacheName: "assets-cache" },
                    },
                    {
                        urlPattern: /\/graphql\/.*$/,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "graphql-cache",
                            precacheFallback: { fallbackURL: `https://${app.fqdn}/graphql` },
                        },
                        method: "POST",
                    },
                ],
                ...pluginOptions.pwa?.workbox,
            },
            manifest: {
                name: app.name[0].toUpperCase().concat(app.name.slice(1)),
                short_name: app.name,
                scope: "/",
                start_url: "/",
                theme_color: "#7f7f7f",
                categories: ["Web Application"],
                ...pluginOptions?.pwa?.manifest,
            },
        });
        pluginOptions.pwa?.enabled && (0, vite_plugin_pwa_1.VitePWA)(pwaOptions).forEach(it => plugins.push(it));
    }
    return plugins;
}
exports.commonPlugins = commonPlugins;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vcGx1Z2lucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwrQkFBNkM7QUFDN0MsOEVBQTREO0FBQzVELDBFQUEwRDtBQUMxRCx3RUFBNkQ7QUFDN0QscURBQXNFO0FBQ3RFLDBFQUFzRjtBQUN0Riw4RUFBb0U7QUFJcEUsU0FBUyx1QkFBdUIsQ0FBQyxFQUMvQixTQUFTLEdBQUcsU0FBUyxFQUNyQixHQUFHLEdBQUcsU0FBUyxFQUNmLEdBQUcsWUFBWSxFQUNpQjtJQUNoQyxPQUFPO1FBQ0wsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CO1lBQ3hDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxTQUFTLEVBQUU7WUFDdkUsQ0FBQyxDQUFDLFNBQVM7UUFDYixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHO1FBQ2hHLEdBQUcsWUFBWTtLQUNoQixDQUFBO0FBQ0gsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsT0FBaUM7SUFDMUQsT0FBTztRQUNMLGNBQWMsRUFBRSxNQUFNO1FBQ3RCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsTUFBTSxFQUFFLElBQUk7UUFDWixHQUFHLE9BQU87S0FDWCxDQUFBO0FBQ0gsQ0FBQztBQUVELFNBQVMseUJBQXlCLENBQUMsR0FBYSxFQUFFLFNBQTRDO0lBQzVGLE1BQU0sUUFBUSxHQUFvQixHQUFHLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FB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