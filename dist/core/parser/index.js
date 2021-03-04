"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreParser = void 0;
class CoreParser {
    constructor() {
        this.parseFnTree = [];
        this.ruleSetter = this.ruleSetter.bind(this);
    }
    ruleSetter(fn) {
        this.parseFnTree.push(fn);
    }
    getParseFnTree() {
        return this.parseFnTree;
    }
}
exports.CoreParser = CoreParser;
exports.default = new CoreParser();
//# sourceMappingURL=index.js.map