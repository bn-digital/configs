"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveBaseUrl = exports.configureReact = void 0;
const vite_1 = require("vite");
const process = __importStar(require("process"));
const common_1 = require("./common");
const env_1 = require("./common/env");
const react_1 = require("./react");
/**
 * Resolve the base URL for the application depending on the environment
 * @param appEnv
 */
function resolveBaseUrl(appEnv = "development") {
    if (appEnv === "development")
        return "/";
    const { name, homepage = "" } = (0, common_1.readPackageJson)(process.cwd());
    if (homepage)
        return homepage;
    const domain = (0, env_1.env)("DOMAIN", "");
    if (domain)
        return `https:://${domain}/`;
    const appName = (0, env_1.env)("APP_NAME", name.split("/")[0].replace("@", ""));
    if (appName || appEnv === "staging")
        return `https://${appName}.bndigital.dev/`;
    return "/";
}
exports.resolveBaseUrl = resolveBaseUrl;
function configureReact(config, plugins = {}) {
    return (0, vite_1.mergeConfig)(config, (0, react_1.withReact)(plugins));
}
exports.configureReact = configureReact;
exports.default = configureReact;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBOEM7QUFFOUMsaURBQWtDO0FBQ2xDLHFDQUEwQztBQUMxQyxzQ0FBa0M7QUFDbEMsbUNBQW1DO0FBR25DOzs7R0FHRztBQUNILFNBQVMsY0FBYyxDQUFDLFNBQXNCLGFBQWE7SUFDekQsSUFBSSxNQUFNLEtBQUssYUFBYTtRQUFFLE9BQU8sR0FBRyxDQUFBO0lBQ3hDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUEsd0JBQWUsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUM5RCxJQUFJLFFBQVE7UUFBRSxPQUFPLFFBQVEsQ0FBQTtJQUU3QixNQUFNLE1BQU0sR0FBRyxJQUFBLFNBQUcsRUFBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDaEMsSUFBSSxNQUFNO1FBQUUsT0FBTyxZQUFZLE1BQU0sR0FBRyxDQUFBO0lBRXhDLE1BQU0sT0FBTyxHQUFHLElBQUEsU0FBRyxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNwRSxJQUFJLE9BQU8sSUFBSSxNQUFNLEtBQUssU0FBUztRQUFFLE9BQU8sV0FBVyxPQUFPLGlCQUFpQixDQUFBO0lBRS9FLE9BQU8sR0FBRyxDQUFBO0FBQ1osQ0FBQztBQU13Qix3Q0FBYztBQUp2QyxTQUFTLGNBQWMsQ0FBQyxNQUFrQixFQUFFLFVBQXVDLEVBQUU7SUFDbkYsT0FBTyxJQUFBLGtCQUFXLEVBQUMsTUFBTSxFQUFFLElBQUEsaUJBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0FBQ2hELENBQUM7QUFFUSx3Q0FBYztBQUN2QixrQkFBZSxjQUFjLENBQUEifQ==