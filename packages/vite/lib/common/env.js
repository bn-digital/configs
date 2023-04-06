"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envOptions = exports.env = void 0;
const prefixes = ["VITE_", "WEBSITE_", "REACT_", "APP_"];
function env(key, defaultValue) {
    return (process.env[key] ?? defaultValue ?? "");
}
exports.env = env;
function envOptions(workingDir) {
    return {
        envDir: workingDir,
        envPrefix: prefixes,
    };
}
exports.envOptions = envOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9lbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBTUEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUV4RCxTQUFTLEdBQUcsQ0FBK0MsR0FBTSxFQUFFLFlBQTJCO0lBQzVGLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQWEsQ0FBQyxJQUFJLFlBQVksSUFBSSxFQUFFLENBQU0sQ0FBQTtBQUNoRSxDQUFDO0FBU1Esa0JBQUc7QUFQWixTQUFTLFVBQVUsQ0FBQyxVQUFtQjtJQUNyQyxPQUFPO1FBQ0wsTUFBTSxFQUFFLFVBQVU7UUFDbEIsU0FBUyxFQUFFLFFBQVE7S0FDcEIsQ0FBQTtBQUNILENBQUM7QUFFYSxnQ0FBVSJ9