"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withReact = void 0;
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const plugin_react_swc_1 = __importDefault(require("@vitejs/plugin-react-swc"));
const vite_1 = require("vite");
const vite_plugin_graphql_codegen_1 = __importDefault(require("vite-plugin-graphql-codegen"));
const vite_plugin_open_graph_1 = __importDefault(require("vite-plugin-open-graph"));
const vite_plugin_svgr_1 = __importDefault(require("vite-plugin-svgr"));
const common_1 = require("../common");
const env_1 = require("../common/env");
const index_1 = require("../index");
function reactPlugins({ svg, swc } = { svg: { enabled: true }, swc: { enabled: false } }) {
    return [
        swc?.enabled
            ? (0, plugin_react_swc_1.default)()
            : (0, plugin_react_1.default)({
                jsxRuntime: "automatic",
            }),
        (0, vite_plugin_svgr_1.default)({
            svgrOptions: svg,
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
            ssrManifest: true,
            chunkSizeWarningLimit: 1024,
            cssCodeSplit: true,
            emptyOutDir: true,
            manifest: true,
            modulePreload: true,
            assetsInlineLimit: 1024 * 4,
            minify: "terser",
            outDir: "build",
            target: "esnext",
        },
        ...(0, common_1.commonOptions)(app, {
            css: { preprocessorOptions: { less: { javascriptEnabled: true } } },
            plugins: [
                ...reactPlugins(config?.react),
                ...[
                    config.graphql?.enabled && (0, vite_plugin_graphql_codegen_1.default)({ runOnBuild: false }),
                    config.openGraph?.enabled && (0, vite_plugin_open_graph_1.default)(config.openGraph),
                ].filter(Boolean),
            ],
            ...(0, env_1.envOptions)(app.workingDir),
            ...config,
        }),
    });
}
exports.withReact = withReact;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVhY3QvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0VBQTZEO0FBQzdELGdGQUFvRTtBQUNwRSwrQkFBcUQ7QUFDckQsOEZBQThEO0FBQzlELG9GQUE2QztBQUM3Qyx3RUFBd0Q7QUFFeEQsc0NBQWtEO0FBQ2xELHVDQUEwQztBQUMxQyxvQ0FBeUM7QUFHekMsU0FBUyxZQUFZLENBQ25CLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBaUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO0lBRTlGLE9BQU87UUFDTCxHQUFHLEVBQUUsT0FBTztZQUNWLENBQUMsQ0FBQyxJQUFBLDBCQUFjLEdBQUU7WUFDbEIsQ0FBQyxDQUFDLElBQUEsc0JBQVcsRUFBQztnQkFDVixVQUFVLEVBQUUsV0FBVzthQUN4QixDQUFDO1FBQ04sSUFBQSwwQkFBVSxFQUFDO1lBQ1QsV0FBVyxFQUFFLEdBQUc7U0FDakIsQ0FBQztLQUNILENBQUE7QUFDSCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsTUFBbUI7SUFDcEMsTUFBTSxHQUFHLEdBQUcsSUFBQSxnQkFBTyxHQUFFLENBQUE7SUFDckIsT0FBTyxJQUFBLG1CQUFZLEVBQUM7UUFDbEIsT0FBTyxFQUFFLEtBQUs7UUFDZCxZQUFZLEVBQUU7WUFDWixjQUFjLENBQ1osUUFBZ0IsRUFDaEIsRUFBRSxJQUFJLEVBQWlGO2dCQUV2RixPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUEsc0JBQWMsRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQTtZQUMzRixDQUFDO1NBQ0Y7UUFDRCxLQUFLLEVBQUU7WUFDTCxXQUFXLEVBQUUsSUFBSTtZQUNqQixxQkFBcUIsRUFBRSxJQUFJO1lBQzNCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsYUFBYSxFQUFFLElBQUk7WUFDbkIsaUJBQWlCLEVBQUUsSUFBSSxHQUFHLENBQUM7WUFDM0IsTUFBTSxFQUFFLFFBQVE7WUFDaEIsTUFBTSxFQUFFLE9BQU87WUFDZixNQUFNLEVBQUUsUUFBUTtTQUNqQjtRQUNELEdBQUcsSUFBQSxzQkFBYSxFQUFDLEdBQUcsRUFBRTtZQUNwQixHQUFHLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDbkUsT0FBTyxFQUFFO2dCQUNQLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQzlCLEdBQUc7b0JBQ0QsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLElBQUksSUFBQSxxQ0FBb0IsRUFBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQztvQkFDdEUsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLElBQUksSUFBQSxnQ0FBUSxFQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7aUJBQ3hELENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUNsQjtZQUNELEdBQUcsSUFBQSxnQkFBVSxFQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDN0IsR0FBRyxNQUFNO1NBQ1YsQ0FBQztLQUNILENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFUSw4QkFBUyJ9