import FileNode from "../fNode/main";
declare type ruleSetterFn = (fileTree: FileNode) => Promise<FileNode>;
export declare class CoreParser {
    parseTree: {
        [key: string]: ruleSetterFn;
    }[];
    constructor();
    ruleSetter<C>(key: keyof C, fn: ruleSetterFn): void;
    getParseTree(): {
        [key: string]: ruleSetterFn;
    }[];
}
declare const _default: CoreParser;
export default _default;
