"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssOptions = void 0;
const postcss_config_1 = __importDefault(require("@bn-digital/postcss-config"));
const cssOptions = (options) => {
    return {
        css: {
            postcss: { plugins: postcss_config_1.default },
            ...options,
        },
    };
};
exports.cssOptions = cssOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0ZBQXVEO0FBS3ZELE1BQU0sVUFBVSxHQUFHLENBQUMsT0FBb0IsRUFBYyxFQUFFO0lBQ3RELE9BQU87UUFDTCxHQUFHLEVBQUU7WUFDSCxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsd0JBQWMsRUFBRTtZQUNwQyxHQUFHLE9BQU87U0FDWDtLQUNGLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFUSxnQ0FBVSJ9