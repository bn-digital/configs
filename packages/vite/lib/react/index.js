"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withReact = void 0;
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const plugin_react_swc_1 = __importDefault(require("@vitejs/plugin-react-swc"));
const vite_1 = require("vite");
const vite_plugin_svgr_1 = __importDefault(require("vite-plugin-svgr"));
const common_1 = require("../common");
const env_1 = require("../common/env");
const plugins_1 = require("../common/plugins");
const index_1 = require("../index");
function reactPlugins({ svg, swc } = { svg: { enabled: true }, swc: { enabled: false } }) {
    return [
        swc?.enabled ? (0, plugin_react_swc_1.default)() : (0, plugin_react_1.default)(),
        svg?.enabled &&
            (0, vite_plugin_svgr_1.default)({
                svgrOptions: { svgo: false },
                esbuildOptions: { minify: true },
            }),
    ];
}
function withReact(config) {
    const app = (0, common_1.appInfo)();
    return (0, vite_1.defineConfig)({
        appType: "spa",
        experimental: {
            renderBuiltUrl(filename, { type }) {
                return type === "public" ? (0, index_1.resolveBaseUrl)(app.mode).concat(filename) : { relative: true };
            },
        },
        build: {
            write: true,
            ssrManifest: true,
            chunkSizeWarningLimit: 1024,
            cssCodeSplit: true,
            emptyOutDir: true,
            manifest: true,
            modulePreload: true,
            assetsInlineLimit: 1024 * 4,
            minify: "terser",
            outDir: "build",
            sourcemap: true,
            target: "esnext",
        },
        ...(0, common_1.commonOptions)(app, {
            css: { preprocessorOptions: { less: { javascriptEnabled: true } } },
            plugins: [...(0, plugins_1.commonPlugins)(app, config), ...reactPlugins(config?.react)].filter(Boolean),
            ...(0, env_1.envOptions)(app.workingDir),
            ...config,
        }),
    });
}
exports.withReact = withReact;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVhY3QvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0VBQTZEO0FBQzdELGdGQUFvRTtBQUNwRSwrQkFBcUQ7QUFDckQsd0VBQXdEO0FBRXhELHNDQUFrRDtBQUNsRCx1Q0FBMEM7QUFDMUMsK0NBQWlEO0FBQ2pELG9DQUF5QztBQUd6QyxTQUFTLFlBQVksQ0FDbkIsRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFpQyxFQUFFLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFFOUYsT0FBTztRQUNMLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUEsMEJBQWMsR0FBRSxDQUFDLENBQUMsQ0FBQyxJQUFBLHNCQUFXLEdBQUU7UUFDL0MsR0FBRyxFQUFFLE9BQU87WUFDVixJQUFBLDBCQUFVLEVBQUM7Z0JBQ1QsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtnQkFDNUIsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTthQUNqQyxDQUFDO0tBQ0wsQ0FBQTtBQUNILENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxNQUFtQjtJQUNwQyxNQUFNLEdBQUcsR0FBRyxJQUFBLGdCQUFPLEdBQUUsQ0FBQTtJQUNyQixPQUFPLElBQUEsbUJBQVksRUFBQztRQUNsQixPQUFPLEVBQUUsS0FBSztRQUNkLFlBQVksRUFBRTtZQUNaLGNBQWMsQ0FDWixRQUFnQixFQUNoQixFQUFFLElBQUksRUFBaUY7Z0JBRXZGLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBQSxzQkFBYyxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFBO1lBQzNGLENBQUM7U0FDRjtRQUNELEtBQUssRUFBRTtZQUNMLEtBQUssRUFBRSxJQUFJO1lBQ1gsV0FBVyxFQUFFLElBQUk7WUFDakIscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixZQUFZLEVBQUUsSUFBSTtZQUNsQixXQUFXLEVBQUUsSUFBSTtZQUNqQixRQUFRLEVBQUUsSUFBSTtZQUNkLGFBQWEsRUFBRSxJQUFJO1lBQ25CLGlCQUFpQixFQUFFLElBQUksR0FBRyxDQUFDO1lBQzNCLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsU0FBUyxFQUFFLElBQUk7WUFDZixNQUFNLEVBQUUsUUFBUTtTQUNqQjtRQUNELEdBQUcsSUFBQSxzQkFBYSxFQUFDLEdBQUcsRUFBRTtZQUNwQixHQUFHLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDbkUsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFBLHVCQUFhLEVBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDeEYsR0FBRyxJQUFBLGdCQUFVLEVBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUM3QixHQUFHLE1BQU07U0FDVixDQUFDO0tBQ0gsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUVRLDhCQUFTIn0=