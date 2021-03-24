import FileNode from "../fNode/main";
import FileTree from "../fileTree";
declare type ruleSetterFn = (key: string, value: string, fileTree: FileTree) => Promise<FileNode>;
export declare class CoreParser {
    parseFnTree: ruleSetterFn[];
    constructor();
    /**
     * 注册解析规则
     * @param fn 解析函数
     */
    ruleSetter(fn: ruleSetterFn): void;
    /**
     * 获取解析规则数
     * @returns {parseFnTree}
     *
     */
    getParseFnTree(): ruleSetterFn[];
}
declare const _default: CoreParser;
export default _default;
