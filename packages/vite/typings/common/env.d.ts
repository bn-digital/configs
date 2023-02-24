import { UserConfig } from 'vite';
type EnvOptions = Partial<Pick<UserConfig, 'define' | 'envPrefix' | 'envDir'>>;
declare const env: <T>(key: keyof typeof process.env, defaultValue?: T) => T | string;
declare const envOptions: () => EnvOptions;
export { env, envOptions };
//# sourceMappingURL=env.d.ts.map