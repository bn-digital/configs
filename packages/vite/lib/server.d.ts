/// <reference types="node" />
declare type ServerOptions = Partial<{
    port: number;
    workingDir: string;
    htmlEntry: string;
    ssrEntry: string;
}>;
declare function createServer(options?: ServerOptions): Promise<import("http").Server>;
export { createServer };
