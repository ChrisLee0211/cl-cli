declare class Context implements contextCtr {
    config: config;
    progressStack: Array<keyof config>;
    setName(name: string): void;
    setProjectType(type: projectType): void;
    setCodeType(type: lang): void;
    setEslint(state: any): void;
    setAxios(state: any): void;
    pushToStack(configName: keyof config): void;
    isFinish(): boolean;
}
declare const _default: Context;
export default _default;
