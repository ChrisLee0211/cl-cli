"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("../../utils/path");
class fileNode {
    constructor(name, path, rootPath, content, isFolder, parent = null) {
        this.parent = null;
        this.children = [];
        this.isFolder = false;
        this.fileName = "";
        this.rootPath = "";
        this.path = "";
        this.isChanged = false;
        this.fileName = name;
        this.path = path_1.checkPathIsUseful(path) ? path : path_1.getCurrentPath();
        this.rootPath = rootPath ? rootPath : path_1.parseRootPath(this.path);
        this.content = content !== null && content !== void 0 ? content : "";
        this.isFolder = isFolder !== null && isFolder !== void 0 ? isFolder : false;
        return this;
    }
    appendChild(fnode) {
        if (this.isFileNode(fnode) === false) {
            throw new Error("expect type fileNode, but got other,please use create createFileNode function");
        }
        if (this.isFolder === false) {
            throw new Error(`${this.fileName} is not a folder!`);
        }
        try {
            const len = this.children.length;
            for (let i = 0; i < len; i++) {
                const child = this.children[i];
                if (child.fileName === fnode.fileName) {
                    throw new Error(`The file ${fnode.fileName} was already exist!`);
                }
            }
        }
        catch (e) {
            console.error(e);
        }
        this.children.push(this.normalizeChildFileNode(fnode));
        this.isChanged = true;
        this.freezeMethod();
        return this;
    }
    destroy() {
        if (this.isFileNode(this.parent)) {
            this.parent.removeChild(this);
            this.parent = null;
        }
        this.freezeMethod();
    }
    removeChild(fnode) {
        this.children = this.children.filter(node => node.fileName !== fnode.fileName);
        this.isChanged = true;
        this.freezeMethod();
    }
    setContent(newContent) {
        let res = true;
        try {
            this.content = newContent;
            this.isChanged = true;
        }
        catch (e) {
            console.error(e);
            res = false;
        }
        this.freezeMethod();
        return res;
    }
    setParent(fnode) {
        this.parent = fnode;
    }
    /**
     * 对path、rootPath、parent属性进行校验与格式化
     * @param fnode
     * @return {fileNode}
     * @author chris lee
     * @Time 2021/02/06
     */
    normalizeChildFileNode(fnode) {
        if (fnode.path !== this.path) {
            fnode.path = path_1.concatPath(this.path, this.fileName);
        }
        if (fnode.rootPath !== this.rootPath) {
            fnode.rootPath = this.rootPath;
        }
        fnode.parent = this;
        return fnode;
    }
    /**
     * 判断是否为fileNode
     * @param target
     * @author chris lee
     * @Time 2021/02/06
     */
    isFileNode(target) {
        let result = false;
        if (target !== null && target.path && target.fileName && target.rootPath) {
            result = true;
        }
        return result;
    }
    freezeMethod() {
        return false;
    }
}
exports.default = fileNode;
//# sourceMappingURL=main.js.map