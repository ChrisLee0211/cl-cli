"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreParser = void 0;
class CoreParser {
    constructor() {
        this.parseFnTree = [];
        this.ruleSetter = this.ruleSetter.bind(this);
    }
    /**
     * 注册解析规则
     * @param fn 解析函数
     */
    ruleSetter(fn) {
        this.parseFnTree.push(fn);
    }
    /**
     * 获取解析规则数
     * @returns {parseFnTree}
     *
     */
    getParseFnTree() {
        return this.parseFnTree;
    }
}
exports.CoreParser = CoreParser;
exports.default = new CoreParser();
//# sourceMappingURL=index.js.map