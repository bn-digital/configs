import { UserConfig } from 'vite';
declare type ServerOptions = Partial<Pick<UserConfig, 'server'>>;
declare const serverOptions: (options?: Partial<Pick<UserConfig, "server">> | undefined) => ServerOptions;
export { serverOptions };
//# sourceMappingURL=server.d.ts.map