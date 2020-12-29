"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRootPath = exports.checkPathIsUseful = exports.concatPath = exports.getCurrentPath = void 0;
const path = require("path");
exports.getCurrentPath = () => {
    return process.cwd();
};
exports.concatPath = (currentPath, name) => {
    return path.join(currentPath, name);
};
exports.checkPathIsUseful = (path) => {
    if (path === '' || !path)
        return false;
    return true;
};
exports.parseRootPath = (pathname) => {
    return path.parse(pathname).root;
};
//# sourceMappingURL=path.js.map