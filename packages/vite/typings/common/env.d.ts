import { UserConfig } from 'vite';
declare type EnvOptions = Partial<Pick<UserConfig, 'define' | 'envPrefix' | 'envDir'>>;
declare const envOptions: () => EnvOptions;
export { envOptions };
//# sourceMappingURL=env.d.ts.map