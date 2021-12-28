"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const config_1 = require("./react/config");
/**
 * @param {UserConfig} config
 */
exports.default = (config = {}) => (0, vite_1.mergeConfig)((0, config_1.withReact)(), config);
