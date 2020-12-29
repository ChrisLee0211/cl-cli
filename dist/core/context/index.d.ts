interface baseConfig {
    name: string;
    [key: string]: any;
}
export declare class Ctx<T = any> {
    config: baseConfig;
    template: string;
    extraConfig: T;
    constructor(name: string, otherConfig?: any);
    add(key: string, value: any): void;
    setTemplate(type: "github" | "gitlab" | "bitbucket", url: string): void;
    getConfig(): Readonly<{
        [x: string]: any;
        name: string;
    } & T>;
}
export {};
