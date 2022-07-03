import { defineConfig } from 'vite'
import multiPageAppPlugin from 'vite-plugin-mpa'

import { commonOptions } from '../common'
import { cssOptions } from '../common/styles'

const withStaticHtml: ConfigCallback = config =>
  defineConfig({
    build: {
      outDir: 'build',
      sourcemap: config?.sourceMaps,
      target: 'es2015',
      emptyOutDir: true,
    },
    ...cssOptions(),
    ...commonOptions({ base: './', plugins: [multiPageAppPlugin({ open: false })] }, config),
  })

export { withStaticHtml }
