import fs from 'fs'
import path, { resolve } from 'path'
import express, { Express } from 'express'
import { createServer as createViteServer } from 'vite'

type ServerOptions = Partial<{ port: number; workingDir: string; htmlEntry: string; ssrEntry: string }>

async function createServer(options?: ServerOptions) {
  const port = options?.port ?? (process.env.PORT ? Number.parseInt(process.env.PORT) : 8080)
  const workingDir = options?.workingDir ?? process.cwd()
  const htmlEntry = path.join(workingDir, options?.htmlEntry ?? 'index.html')
  const ssrEntry = options?.ssrEntry ?? '/src/index.ssr.tsx'

  const app: Express = express()

  // Create Vite server in middleware mode. This disables Vite's own HTML
  // serving logic and let the parent server take control.
  //
  // If you want to use Vite's own HTML serving logic (using Vite as
  // a development middleware), using 'html' instead.
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
  })
  // use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    const url = req.originalUrl

    try {
      // 1. Read index.html
      let template = fs.readFileSync(resolve(workingDir, htmlEntry), 'utf-8')

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react-refresh
      template = await vite.transformIndexHtml(url, template)

      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const render = process.env.NODE_ENV !== 'production' ? (await vite.ssrLoadModule(ssrEntry)).render : require(path.join(workingDir, ssrEntry)).render

      // 4. render the app HTML. This assumes index.ssr.tsx 's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()

      const appHtml = render(url)

      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e: any) {
      // If an error is caught, let Vite fix the stracktrace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  return app.listen(port)
}

export { createServer }
