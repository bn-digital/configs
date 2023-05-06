"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonPlugins = void 0;
const vite_1 = require("vite");
const vite_plugin_checker_1 = __importDefault(require("vite-plugin-checker"));
const vite_plugin_fonts_1 = __importDefault(require("vite-plugin-fonts"));
const vite_plugin_graphql_codegen_1 = __importDefault(require("vite-plugin-graphql-codegen"));
const vite_plugin_info_1 = __importDefault(require("vite-plugin-info"));
const vite_plugin_open_graph_1 = __importDefault(require("vite-plugin-open-graph"));
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
            lintCommand: "yarn lint tsx",
            dev: {
                overrideConfig: {
                    fix: true,
                    fixTypes: ["layout", "problem"],
                    cache: true,
                    cacheLocation: ".cache/eslintcache",
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
                    cacheLocation: ".cache/stylelintcache",
                    allowEmptyInput: true,
                    customSyntax: "postcss-less",
                    fix: true,
                    files: ["src/**/*.{less,css}"],
                    config: { extends: "@bn-digital/stylelint-config" },
                },
            },
            lintCommand: "yarn lint less",
            ...overrides.stylelint,
        },
        typescript: { root: app.workingDir, buildMode: app.mode !== "development" },
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
    pluginOptions?.graphql && plugins.push((0, vite_plugin_graphql_codegen_1.default)({ runOnBuild: false, ...pluginOptions.graphql }));
    pluginOptions?.openGraph && plugins.push((0, vite_plugin_open_graph_1.default)(pluginOptions.openGraph));
    return plugins;
}
exports.commonPlugins = commonPlugins;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vcGx1Z2lucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwrQkFBNkM7QUFFN0MsOEVBQTREO0FBRTVELDBFQUEwRDtBQUUxRCw4RkFBOEQ7QUFFOUQsd0VBQTZEO0FBRTdELG9GQUE2QztBQUU3QyxxREFBc0U7QUFFdEUsMEVBQXNGO0FBRXRGLDhFQUFvRTtBQUlwRSxTQUFTLHVCQUF1QixDQUFDLEVBQy9CLFNBQVMsR0FBRyxTQUFTLEVBQ3JCLEdBQUcsR0FBRyxTQUFTLEVBQ2YsR0FBRyxZQUFZLEVBQ2lCO0lBQ2hDLE9BQU87UUFDTCxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7WUFDeEMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLFNBQVMsRUFBRTtZQUN2RSxDQUFDLENBQUMsU0FBUztRQUNiLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUc7UUFDaEcsR0FBRyxZQUFZO0tBQ2hCLENBQUE7QUFDSCxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxPQUFpQztJQUMxRCxPQUFPO1FBQ0wsY0FBYyxFQUFFLE1BQU07UUFDdEIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixNQUFNLEVBQUUsSUFBSTtRQUNaLEdBQUcsT0FBTztLQUNYLENBQUE7QUFDSCxDQUFDO0FBRUQsU0FBUyx5QkFBeUIsQ0FBQyxHQUFhLEVBQUUsU0FBNEM7SUFDNUYsTUFBTSxRQUFRLEdBQW9CLEdBQUcsQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDLENB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