"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatPath = exports.getCurrentPath = void 0;
const path = require("path");
exports.getCurrentPath = () => {
    return process.cwd();
};
exports.concatPath = (currentPath, name) => {
    return path.join(currentPath, name);
};
//# sourceMappingURL=path.js.map