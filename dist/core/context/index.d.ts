interface baseConfig {
    name: string;
    [key: string]: any;
}
export declare class Ctx<T = any> {
    config: baseConfig;
    extraConfig: T;
    constructor(name: string, otherConfig?: any);
    add(key: string, value: any): void;
    getConfig(): Readonly<{
        [x: string]: any;
        name: string;
    } & T>;
}
export {};
