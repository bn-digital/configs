"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withReact = void 0;
const vite_1 = require("vite");
const lib_1 = __importDefault(require("vite-plugin-svgr/lib"));
const path_1 = __importDefault(require("path"));
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const fs_1 = __importDefault(require("fs"));
const vite_plugin_pwa_1 = require("vite-plugin-pwa");
const postcss_config_1 = __importDefault(require("@bn-digital/postcss-config"));
function readPackageJson() {
    return JSON.parse(fs_1.default.readFileSync(path_1.default.join(process.cwd(), 'package.json'), 'utf-8'));
}
function withReact() {
    var _a;
    const packageJson = readPackageJson();
    const target = packageJson === null || packageJson === void 0 ? void 0 : packageJson.proxy;
    const workingDir = process.cwd();
    return (0, vite_1.defineConfig)({
        plugins: [
            (0, plugin_react_1.default)({
                jsxRuntime: 'automatic',
                babel: {
                    plugins: [
                        [
                            'import',
                            {
                                libraryName: 'antd',
                                libraryDirectory: 'es',
                            },
                        ],
                    ],
                },
            }),
            (0, lib_1.default)(),
            (0, vite_plugin_pwa_1.VitePWA)(),
        ],
        build: { outDir: 'build' },
        envDir: workingDir,
        envPrefix: 'WEBSITE_',
        server: {
            port: Number.parseInt((_a = process.env.WEBSITE_PORT) !== null && _a !== void 0 ? _a : '8080'),
            strictPort: false,
            proxy: target
                ? {
                    '/api': { target },
                    '/graphql': { target },
                    '/admin': { target },
                    '/upload': { target },
                }
                : undefined,
        },
        css: { postcss: { plugins: postcss_config_1.default }, preprocessorOptions: { less: { javascriptEnabled: true } } },
        resolve: { alias: { src: path_1.default.resolve(workingDir, './src') } },
    });
}
exports.withReact = withReact;
