"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonOptions = void 0;
const env_1 = require("./env");
const plugins_1 = require("./plugins");
const server_1 = require("./server");
const styles_1 = require("./styles");
/**
 * @param {PluginOptions} options
 * @param {CommonOptions} config
 */
const commonOptions = (options = { plugins: [] }, config = {}) => {
    const { plugins, css, server } = options;
    return {
        plugins: (0, plugins_1.commonPlugins)(config).concat(plugins),
        ...(0, server_1.serverOptions)(server),
        ...(0, styles_1.cssOptions)(css),
        ...(0, env_1.envOptions)(),
    };
};
exports.commonOptions = commonOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLCtCQUFrQztBQUNsQyx1Q0FBeUM7QUFDekMscUNBQXdDO0FBQ3hDLHFDQUFxQztBQUdyQzs7O0dBR0c7QUFDSCxNQUFNLGFBQWEsR0FBRyxDQUNwQixVQUF5QixFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFDeEMsU0FBaUMsRUFBRSxFQUNwQixFQUFFO0lBQ2pCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQTtJQUN4QyxPQUFPO1FBQ0wsT0FBTyxFQUFFLElBQUEsdUJBQWEsRUFBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlDLEdBQUcsSUFBQSxzQkFBYSxFQUFDLE1BQU0sQ0FBQztRQUN4QixHQUFHLElBQUEsbUJBQVUsRUFBQyxHQUFHLENBQUM7UUFDbEIsR0FBRyxJQUFBLGdCQUFVLEdBQUU7S0FDaEIsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVRLHNDQUFhIn0=