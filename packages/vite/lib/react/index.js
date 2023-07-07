"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withReact = void 0;
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const plugin_react_swc_1 = __importDefault(require("@vitejs/plugin-react-swc"));
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
    return {
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
    };
}
exports.withReact = withReact;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVhY3QvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0VBQTZEO0FBQzdELGdGQUFvRTtBQUVwRSx3RUFBd0Q7QUFFeEQsc0NBQWtEO0FBQ2xELHVDQUEwQztBQUMxQywrQ0FBaUQ7QUFDakQsb0NBQXlDO0FBR3pDLFNBQVMsWUFBWSxDQUNuQixFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQWlDLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUU5RixPQUFPO1FBQ0wsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBQSwwQkFBYyxHQUFFLENBQUMsQ0FBQyxDQUFDLElBQUEsc0JBQVcsR0FBRTtRQUMvQyxHQUFHLEVBQUUsT0FBTztZQUNWLElBQUEsMEJBQVUsRUFBQztnQkFDVCxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFO2dCQUM1QixjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2FBQ2pDLENBQUM7S0FDTCxDQUFBO0FBQ0gsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLE1BQW1CO0lBQ3BDLE1BQU0sR0FBRyxHQUFHLElBQUEsZ0JBQU8sR0FBRSxDQUFBO0lBQ3JCLE9BQU87UUFDTCxPQUFPLEVBQUUsS0FBSztRQUNkLFlBQVksRUFBRTtZQUNaLGNBQWMsQ0FDWixRQUFnQixFQUNoQixFQUFFLElBQUksRUFBaUY7Z0JBRXZGLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBQSxzQkFBYyxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFBO1lBQzNGLENBQUM7U0FDRjtRQUNELEtBQUssRUFBRTtZQUNMLEtBQUssRUFBRSxJQUFJO1lBQ1gsV0FBVyxFQUFFLElBQUk7WUFDakIscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixZQUFZLEVBQUUsSUFBSTtZQUNsQixXQUFXLEVBQUUsSUFBSTtZQUNqQixRQUFRLEVBQUUsSUFBSTtZQUNkLGFBQWEsRUFBRSxJQUFJO1lBQ25CLGlCQUFpQixFQUFFLElBQUksR0FBRyxDQUFDO1lBQzNCLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsU0FBUyxFQUFFLElBQUk7WUFDZixNQUFNLEVBQUUsUUFBUTtTQUNqQjtRQUNELEdBQUcsSUFBQSxzQkFBYSxFQUFDLEdBQUcsRUFBRTtZQUNwQixHQUFHLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDbkUsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFBLHVCQUFhLEVBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDeEYsR0FBRyxJQUFBLGdCQUFVLEVBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUM3QixHQUFHLE1BQU07U0FDVixDQUFDO0tBQ0gsQ0FBQTtBQUNILENBQUM7QUFFUSw4QkFBUyJ9