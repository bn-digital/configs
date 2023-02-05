import { UserConfig } from 'vite';
type ServerOptions = UserConfig['server'];
declare const serverOptions: (options?: ServerOptions) => Pick<UserConfig, 'server'>;
export { serverOptions };
//# sourceMappingURL=server.d.ts.map