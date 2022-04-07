import { mergeConfig } from 'vite'

import { withReact } from './react'
import { withStaticHtml } from './static'
import Vite from './types/config'

const configureReact: Vite.ConfigMergeCallback = (config = {}, plugins = {}) => mergeConfig(withReact(plugins), config)

const configureStaticHtml: Vite.ConfigMergeCallback = (config = {}, plugins = {}) => mergeConfig(withStaticHtml(plugins), config)

export { configureReact, configureStaticHtml,configureReact as default }
