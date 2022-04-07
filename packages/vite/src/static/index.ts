import {defineConfig} from 'vite'
import multiPageAppPlugin from 'vite-plugin-mpa'

import {commonOptions} from '../common'
import Vite from '../types/config'

const withStaticHtml: Vite.ConfigCallback = config =>
  defineConfig({
    build: {
      outDir: 'build',
      sourcemap: Boolean(process.env.SOURCE_MAPS),
      target: 'es2015',
      emptyOutDir: true,
    },
    ...commonOptions({ base: './', plugins: [multiPageAppPlugin({ open: false })] }, config),
  })

export { withStaticHtml }
