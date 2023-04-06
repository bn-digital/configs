"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveBaseUrl = exports.configureReact = void 0;
const vite_1 = require("vite");
const react_1 = require("./react");
function resolveBaseUrl(env) {
    switch (env) {
        case "production":
            return `https://${process.env.DOMAIN}/`;
        case "staging":
            return process.env.APP_NAME ? `https://${process.env.APP_NAME}.bndigital.dev/` : "/";
        case "development":
            return "http://localhost:8080/";
        default:
            return "/";
    }
}
exports.resolveBaseUrl = resolveBaseUrl;
function configureReact(config, plugins = {}) {
    return (0, vite_1.mergeConfig)(config, (0, react_1.withReact)(plugins));
}
exports.configureReact = configureReact;
exports.default = { configureReact };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQThDO0FBRTlDLG1DQUFtQztBQUduQyxTQUFTLGNBQWMsQ0FBQyxHQUF1QjtJQUM3QyxRQUFRLEdBQUcsRUFBRTtRQUNYLEtBQUssWUFBWTtZQUNmLE9BQU8sV0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFBO1FBQ3pDLEtBQUssU0FBUztZQUNaLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7UUFDdEYsS0FBSyxhQUFhO1lBQ2hCLE9BQU8sd0JBQXdCLENBQUE7UUFDakM7WUFDRSxPQUFPLEdBQUcsQ0FBQTtLQUNiO0FBQ0gsQ0FBQztBQU13Qix3Q0FBYztBQUp2QyxTQUFTLGNBQWMsQ0FBQyxNQUFrQixFQUFFLFVBQXVDLEVBQUU7SUFDbkYsT0FBTyxJQUFBLGtCQUFXLEVBQUMsTUFBTSxFQUFFLElBQUEsaUJBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0FBQ2hELENBQUM7QUFFUSx3Q0FBYztBQUN2QixrQkFBZSxFQUFFLGNBQWMsRUFBRSxDQUFBIn0=