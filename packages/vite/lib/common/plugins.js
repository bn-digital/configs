"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPackageJson = exports.commonPlugins = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const vite_1 = require("vite");
const vite_plugin_checker_1 = __importDefault(require("vite-plugin-checker"));
const vite_plugin_fonts_1 = __importDefault(require("vite-plugin-fonts"));
const vite_plugin_pwa_1 = require("vite-plugin-pwa");
const vite_plugin_radar_1 = __importDefault(require("vite-plugin-radar"));
const vite_tsconfig_paths_1 = __importDefault(require("vite-tsconfig-paths"));
const env_1 = require("./env");
function readPackageJson(workingDir = '') {
    return JSON.parse((0, node_fs_1.readFileSync)((0, node_path_1.join)(workingDir ?? process.cwd(), 'package.json'), 'utf-8'));
}
exports.readPackageJson = readPackageJson;
function resolveAnalyticsOptions(extraOptions) {
    return {
        analytics: process.env.GOOGLE_ANALYTICS_ID ? { id: process.env.GOOGLE_ANALYTICS_ID } : undefined,
        gtm: process.env.GOOGLE_TAG_MANAGER_ID ? { id: process.env.GOOGLE_TAG_MANAGER_ID } : undefined,
        ...extraOptions,
    };
}
function resolvePWAOptions(extraOptions) {
    return {
        injectRegister: 'auto',
        strategies: 'injectManifest',
        minify: true,
        ...extraOptions,
    };
}
function commonPlugins(options = {}) {
    const workingDir = process.cwd();
    const logLevel = options.mode !== 'development' ? ['error'] : ['error', 'warning'];
    const packageJson = readPackageJson();
    const plugins = [(0, vite_1.splitVendorChunkPlugin)(), (0, vite_tsconfig_paths_1.default)({ root: workingDir })];
    if (options.lint) {
        const { enabled, ...checkOptions } = options.lint;
        enabled &&
            plugins.push((0, vite_plugin_checker_1.default)({
                enableBuild: true,
                overlay: { position: 'tr', initialIsOpen: false },
                eslint: {
                    lintCommand: 'eslint src/**/*.{ts,tsx}',
                    dev: {
                        overrideConfig: {
                            cache: true,
                            fix: true,
                            cacheLocation: 'node_modules/.cache/eslintcache',
                            baseConfig: {
                                extends: '@bn-digital/eslint-config/react',
                                ignorePatterns: ['src/graphql/index.tsx', 'src/types/graphql.d.ts'],
                            },
                        },
                        logLevel,
                    },
                },
                stylelint: {
                    dev: {
                        logLevel,
                        overrideConfig: {
                            cache: true,
                            allowEmptyInput: true,
                            fix: true,
                            ignorePath: ['build', 'node_modules', 'dist', 'dev-dist'],
                            cacheLocation: 'node_modules/.cache/stylelintcache',
                            config: { extends: '@bn-digital/stylelint-config/less' },
                        },
                    },
                    lintCommand: 'stylelint src/**/*.{vue,html,css,scss,sass,less,styl}',
                },
                typescript: { root: workingDir },
                terminal: true,
                ...checkOptions,
            }));
    }
    const fontsOptions = options?.fonts;
    fontsOptions && plugins.push((0, vite_plugin_fonts_1.default)(fontsOptions));
    const analyticsOptions = options?.analytics && resolveAnalyticsOptions(options.analytics);
    analyticsOptions && plugins.push((0, vite_plugin_radar_1.default)(analyticsOptions));
    const pwaOptions = options?.pwa &&
        resolvePWAOptions({
            injectRegister: 'inline',
            registerType: 'autoUpdate',
            includeManifestIcons: true,
            mode: (0, env_1.env)('NODE_ENV') !== 'production' ? 'development' : 'production',
            ...options?.pwa,
            workbox: {
                sourcemap: (0, env_1.env)('NODE_ENV') !== 'production',
                mode: (0, env_1.env)('NODE_ENV', 'development'),
                ignoreURLParametersMatching: [/\/admin$/, /\/graphql/, /\/upload$/, /\/api$/],
                disableDevLogs: (0, env_1.env)('NODE_ENV') === 'production',
                runtimeCaching: [
                    {
                        urlPattern: ({ request }) => ['image', 'font', 'script', 'style'].find(it => request.destination === it),
                        handler: 'StaleWhileRevalidate',
                        options: { cacheName: 'assets-cache' },
                    },
                ],
                ...options?.pwa.workbox,
            },
            manifest: {
                name: packageJson.name,
                short_name: packageJson.name,
                scope: '/',
                start_url: '/',
                theme_color: '#7f7f7f',
                categories: ['Web Application'],
                ...options?.pwa?.manifest,
            },
        });
    pwaOptions && (0, vite_plugin_pwa_1.VitePWA)(pwaOptions).forEach(it => plugins.push(it));
    return plugins;
}
exports.commonPlugins = commonPlugins;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vcGx1Z2lucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxQ0FBc0M7QUFDdEMseUNBQWdDO0FBRWhDLCtCQUE2QztBQUM3Qyw4RUFBNEQ7QUFDNUQsMEVBQTBEO0FBQzFELHFEQUFzRTtBQUN0RSwwRUFBc0Y7QUFDdEYsOEVBQW9FO0FBRXBFLCtCQUEyQjtBQUUzQixTQUFTLGVBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUN0QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBQSxzQkFBWSxFQUFDLElBQUEsZ0JBQUksRUFBQyxVQUFVLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7QUFDN0YsQ0FBQztBQWtIdUIsMENBQWU7QUFoSHZDLFNBQVMsdUJBQXVCLENBQUMsWUFBOEM7SUFDN0UsT0FBTztRQUNMLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDaEcsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUM5RixHQUFHLFlBQVk7S0FDaEIsQ0FBQTtBQUNILENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFDLFlBQXNDO0lBQy9ELE9BQU87UUFDTCxjQUFjLEVBQUUsTUFBTTtRQUN0QixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLE1BQU0sRUFBRSxJQUFJO1FBQ1osR0FBRyxZQUFZO0tBQ2hCLENBQUE7QUFDSCxDQUFDO0FBRUQs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