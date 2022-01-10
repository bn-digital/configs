/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import {mergeConfig, UserConfig} from 'vite'
import {withReact} from './react/config'

/**
 * @param {UserConfig} config
 */
export default (config: UserConfig = {}) => mergeConfig(withReact(), config)
