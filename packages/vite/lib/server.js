"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
const vite_1 = require("vite");
async function createServer(options) {
    var _a, _b, _c, _d;
    const port = (_a = options === null || options === void 0 ? void 0 : options.port) !== null && _a !== void 0 ? _a : (process.env.PORT ? Number.parseInt(process.env.PORT) : 8080);
    const workingDir = (_b = options === null || options === void 0 ? void 0 : options.workingDir) !== null && _b !== void 0 ? _b : process.cwd();
    const htmlEntry = path_1.default.join(workingDir, (_c = options === null || options === void 0 ? void 0 : options.htmlEntry) !== null && _c !== void 0 ? _c : 'index.html');
    const ssrEntry = (_d = options === null || options === void 0 ? void 0 : options.ssrEntry) !== null && _d !== void 0 ? _d : '/src/index.ssr.tsx';
    const app = (0, express_1.default)();
    // Create Vite server in middleware mode. This disables Vite's own HTML
    // serving logic and let the parent server take control.
    //
    // If you want to use Vite's own HTML serving logic (using Vite as
    // a development middleware), using 'html' instead.
    const vite = await (0, vite_1.createServer)({
        server: { middlewareMode: 'ssr' },
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
    app.use('*', async (req, res) => {
        const url = req.originalUrl;
        try {
            // 1. Read index.html
            let template = fs_1.default.readFileSync((0, path_1.resolve)(workingDir, htmlEntry), 'utf-8');
            // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
            //    also applies HTML transforms from Vite plugins, e.g. global preambles
            //    from @vitejs/plugin-react-refresh
            template = await vite.transformIndexHtml(url, template);
            // 3. Load the server entry. vite.ssrLoadModule automatically transforms
            //    your ESM source code to be usable in Node.js! There is no bundling
            //    required, and provides efficient invalidation similar to HMR.
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const render = process.env.NODE_ENV !== 'production' ? (await vite.ssrLoadModule(ssrEntry)).render : require(path_1.default.join(workingDir, ssrEntry)).render;
            // 4. render the app HTML. This assumes index.ssr.tsx 's exported `render`
            //    function calls appropriate framework SSR APIs,
            //    e.g. ReactDOMServer.renderToString()
            const appHtml = render(url);
            // 5. Inject the app-rendered HTML into the template.
            const html = template.replace(`<!--ssr-outlet-->`, appHtml);
            // 6. Send the rendered HTML back.
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        }
        catch (e) {
            // If an error is caught, let Vite fix the stracktrace so it maps back to
            // your actual source code.
            vite.ssrFixStacktrace(e);
            console.error(e);
            res.status(500).end(e.message);
        }
    });
    return app.listen(port);
}
exports.createServer = createServer;
