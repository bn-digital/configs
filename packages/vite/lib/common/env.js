"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envOptions = exports.env = void 0;
const node_path_1 = require("node:path");
const dotenv_1 = require("dotenv");
const prefixes = ['VITE_', 'WEBSITE_', 'REACT_', 'APP_'];
const workingDir = process.cwd();
(0, dotenv_1.config)({ path: (0, node_path_1.join)(workingDir, '.env') });
const env = (key, defaultValue) => process.env?.[key] ?? defaultValue ?? '';
exports.env = env;
const envOptions = () => {
    return {
        envDir: workingDir,
        envPrefix: prefixes,
    };
};
exports.envOptions = envOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9lbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBQWdDO0FBR2hDLG1DQUErQjtBQUkvQixNQUFNLFFBQVEsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQ3hELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUNoQyxJQUFBLGVBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxJQUFBLGdCQUFJLEVBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUMxQyxNQUFNLEdBQUcsR0FBdUUsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FDcEcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFlBQVksSUFBSSxFQUFFLENBQUE7QUFTakMsa0JBQUc7QUFQWixNQUFNLFVBQVUsR0FBRyxHQUFlLEVBQUU7SUFDbEMsT0FBTztRQUNMLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLFNBQVMsRUFBRSxRQUFRO0tBQ3BCLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFYSxnQ0FBVSJ9