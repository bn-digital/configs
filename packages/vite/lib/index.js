"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.configureReact = void 0;
const vite_1 = require("vite");
const react_1 = require("./react");
function configureReact(config, plugins) {
    return (0, vite_1.mergeConfig)(config, (0, react_1.withReact)(plugins));
}
exports.configureReact = configureReact;
exports.default = configureReact;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQThDO0FBRTlDLG1DQUFtQztBQUVuQyxTQUFTLGNBQWMsQ0FBQyxNQUFrQixFQUFFLE9BQXNCO0lBQ2hFLE9BQU8sSUFBQSxrQkFBVyxFQUFDLE1BQU0sRUFBRSxJQUFBLGlCQUFTLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtBQUNoRCxDQUFDO0FBRVEsd0NBQWM7QUFBb0IsaUNBQU8ifQ==