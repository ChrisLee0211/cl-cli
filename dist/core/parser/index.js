"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreParser = void 0;
class CoreParser {
    constructor() {
        this.parseTree = [];
        this.ruleSetter = this.ruleSetter.bind(this);
    }
    ruleSetter(key, fileNode) {
        const result = {};
        result[key] = fileNode;
        this.parseTree.push(result);
    }
    getParseTree() {
        return this.parseTree;
    }
}
exports.CoreParser = CoreParser;
exports.default = new CoreParser();
//# sourceMappingURL=index.js.map