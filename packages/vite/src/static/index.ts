import { defineConfig } from 'vite'
import { ConfigCallback } from '../index'
import { commonOptions } from '../common'
import multiPageAppPlugin from 'vite-plugin-mpa'

const withStaticHtml: ConfigCallback = config =>
  defineConfig({
    build: {
      outDir: 'build',
      sourcemap: true,
      target: 'es2015',
      emptyOutDir: true,
    },
    ...commonOptions({ base: './', plugins: [multiPageAppPlugin({ open: false })] }, config),
  })

export { withStaticHtml }
