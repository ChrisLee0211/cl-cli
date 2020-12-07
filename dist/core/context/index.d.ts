declare class Context implements contextCtr {
    config: config;
    progressStack: Array<keyof config>;
    setName(name: string): void;
    setProjectType(type: projectType): void;
    setCodeType(type: lang): void;
    setEslint(state: any): void;
    setAxios(state: any): void;
    setFrame(frame: frame): void;
    setUI(ui: ui): void;
    setEnv(env: env): void;
    pushToStack(configName: keyof config): void;
    isFinish(): boolean;
}
declare const _default: Context;
export default _default;
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
