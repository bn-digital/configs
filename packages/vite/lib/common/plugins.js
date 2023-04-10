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
            lintCommand: "eslint src/**/*.{tsx,ts}",
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
            lintCommand: "",
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