import vite from "../types";
declare const commonOptions: (app: vite.App, options?: vite.Config) => vite.Config;
/**
 * Read the package.json file from the working directory
 * @param workingDir
 */
export declare function readPackageJson(workingDir: string): vite.App["package"];
/**
 * Get the application information
 */
declare function appInfo(): vite.App;
export { appInfo, commonOptions };
//# sourceMappingURL=index.d.ts.map