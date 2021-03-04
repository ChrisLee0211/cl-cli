import FileNode from "../fNode/main";
declare type ruleSetterFn = (key: string, value: string, fileTree: FileNode) => Promise<FileNode>;
export declare class CoreParser {
    parseFnTree: ruleSetterFn[];
    constructor();
    ruleSetter(fn: ruleSetterFn): void;
    getParseFnTree(): ruleSetterFn[];
}
declare const _default: CoreParser;
export default _default;
