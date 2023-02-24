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
const vite_plugin_svgr_1 = __importDefault(require("vite-plugin-svgr"));
const common_1 = require("../common");
function reactPlugins(params = { swc: false }) {
    return [
        params.swc
            ? (0, plugin_react_swc_1.default)()
            : (0, plugin_react_1.default)({
                jsxRuntime: 'automatic',
            }),
        (0, vite_plugin_svgr_1.default)({
            svgrOptions: { svgo: false },
        }),
    ];
}
function withReact(config = { graphql: { enabled: true }, lint: { enabled: true } }) {
    return (0, vite_1.defineConfig)({
        appType: 'spa',
        build: {
            chunkSizeWarningLimit: 1024,
            cssCodeSplit: true,
            emptyOutDir: true,
            manifest: true,
            modulePreload: true,
            assetsInlineLimit: 1024 * 16,
            outDir: 'build',
            target: 'esnext',
        },
        ...(0, common_1.commonOptions)({
            css: {
                preprocessorOptions: { less: { javascriptEnabled: true } },
            },
            plugins: [
                ...reactPlugins(config?.react),
                ...[config.graphql?.enabled && (0, vite_plugin_graphql_codegen_1.default)({ runOnBuild: false })].filter(Boolean),
            ],
        }, config),
    });
}
exports.withReact = withReact;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVhY3QvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0VBQTZEO0FBQzdELGdGQUFvRTtBQUNwRSwrQkFBcUQ7QUFDckQsOEZBQThEO0FBQzlELHdFQUF3RDtBQUV4RCxzQ0FBeUM7QUFFekMsU0FBUyxZQUFZLENBQUMsU0FBZ0MsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0lBQ2xFLE9BQU87UUFDTCxNQUFNLENBQUMsR0FBRztZQUNSLENBQUMsQ0FBQyxJQUFBLDBCQUFjLEdBQUU7WUFDbEIsQ0FBQyxDQUFDLElBQUEsc0JBQVcsRUFBQztnQkFDVixVQUFVLEVBQUUsV0FBVzthQUN4QixDQUFDO1FBQ04sSUFBQSwwQkFBVSxFQUFDO1lBQ1QsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtTQUM3QixDQUFDO0tBQ0gsQ0FBQTtBQUNILENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FDaEIsU0FBaUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFO0lBRXhGLE9BQU8sSUFBQSxtQkFBWSxFQUFDO1FBQ2xCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFO1lBQ0wscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixZQUFZLEVBQUUsSUFBSTtZQUNsQixXQUFXLEVBQUUsSUFBSTtZQUNqQixRQUFRLEVBQUUsSUFBSTtZQUNkLGFBQWEsRUFBRSxJQUFJO1lBQ25CLGlCQUFpQixFQUFFLElBQUksR0FBRyxFQUFFO1lBQzVCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsTUFBTSxFQUFFLFFBQVE7U0FDakI7UUFDRCxHQUFHLElBQUEsc0JBQWEsRUFDZDtZQUNFLEdBQUcsRUFBRTtnQkFDSCxtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxFQUFFO2FBQzNEO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQzlCLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sSUFBSSxJQUFBLHFDQUFvQixFQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQzVGO1NBQ0YsRUFDRCxNQUFNLENBQ1A7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDO0FBRVEsOEJBQVMifQ==