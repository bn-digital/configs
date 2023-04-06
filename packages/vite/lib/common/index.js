"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonOptions = exports.appInfo = void 0;
const dotenv_1 = require("dotenv");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const env_1 = require("./env");
const plugins_1 = require("./plugins");
const server_1 = require("./server");
const styles_1 = require("./styles");
const commonOptions = (app, options = { plugins: [] }) => {
    const { plugins, css, server } = options;
    return {
        server: (0, server_1.serverOptions)({ ...server, proxyUrl: app.package?.proxy }),
        css: (0, styles_1.cssOptions)(css),
        plugins: (0, plugins_1.commonPlugins)(app, options).concat(plugins),
    };
};
exports.commonOptions = commonOptions;
function readPackageJson(workingDir) {
    return JSON.parse(fs_1.default.readFileSync((0, path_1.join)(workingDir, "package.json"), "utf8"));
}
function appInfo() {
    const workingDir = process.cwd();
    const nodeEnv = (0, env_1.env)("NODE_ENV", "development");
    const packageData = readPackageJson(workingDir);
    (0, dotenv_1.config)();
    const name = packageData.name.startsWith("@") ? packageData.name.split("/")[1] : packageData.name;
    return {
        fqdn: (0, env_1.env)("DOMAIN", [name, "bndigital.dev"].join(".")),
        name: name[0].toUpperCase().concat(name.slice(1)),
        package: packageData,
        workingDir,
        isDev: nodeEnv === "development",
        isProd: nodeEnv === "production",
        mode: (0, env_1.env)("APP_ENV", "development") ?? nodeEnv,
        buildMode: nodeEnv === "development" ? "development" : "production",
    };
}
exports.appInfo = appInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1DQUErQjtBQUMvQiw0Q0FBbUI7QUFDbkIsK0JBQTJCO0FBRzNCLCtCQUEyQjtBQUMzQix1Q0FBeUM7QUFDekMscUNBQXdDO0FBQ3hDLHFDQUFxQztBQUNyQyxNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQWEsRUFBRSxVQUF1QixFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBZSxFQUFFO0lBQzNGLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQTtJQUN4QyxPQUFPO1FBQ0wsTUFBTSxFQUFFLElBQUEsc0JBQWEsRUFBQyxFQUFFLEdBQUcsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ2xFLEdBQUcsRUFBRSxJQUFBLG1CQUFVLEVBQUMsR0FBRyxDQUFDO1FBQ3BCLE9BQU8sRUFBRSxJQUFBLHVCQUFhLEVBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7S0FDckQsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQTBCaUIsc0NBQWE7QUF4Qi9CLFNBQVMsZUFBZSxDQUFDLFVBQWtCO0lBQ3pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLElBQUEsV0FBSSxFQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQzlFLENBQUM7QUFFRCxTQUFTLE9BQU87SUFDZCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDaEMsTUFBTSxPQUFPLEdBQUcsSUFBQSxTQUFHLEVBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBQzlDLE1BQU0sV0FBVyxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUMvQyxJQUFBLGVBQU0sR0FBRSxDQUFBO0lBRVIsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFBO0lBRWpHLE9BQU87UUFDTCxJQUFJLEVBQUUsSUFBQSxTQUFHLEVBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0RCxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sRUFBRSxXQUFXO1FBQ3BCLFVBQVU7UUFDVixLQUFLLEVBQUUsT0FBTyxLQUFLLGFBQWE7UUFDaEMsTUFBTSxFQUFFLE9BQU8sS0FBSyxZQUFZO1FBQ2hDLElBQUksRUFBRSxJQUFBLFNBQUcsRUFBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLElBQUssT0FBdUI7UUFDL0QsU0FBUyxFQUFFLE9BQU8sS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsWUFBWTtLQUNwRSxDQUFBO0FBQ0gsQ0FBQztBQUVRLDBCQUFPIn0=