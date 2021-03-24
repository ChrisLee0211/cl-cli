"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("../../utils/path");
const file_1 = require("../../utils/file");
class fileNode {
    constructor(name, path, rootPath, content, isFolder, parent = null) {
        this.parent = null;
        this.children = [];
        this.isFolder = false;
        this.fileName = "";
        this.rootPath = "";
        this.path = "";
        this.fileName = name;
        this.path = path_1.checkPathIsUseful(path) ? path : path_1.getCurrentPath();
        this.rootPath = rootPath ? rootPath : path_1.parseRootPath(this.path);
        this.isFolder = isFolder !== null && isFolder !== void 0 ? isFolder : false;
        this.isChanged = false;
        this.parent = parent;
        this.setContent(content !== null && content !== void 0 ? content : null);
        this.id = this.path + this.fileName;
        return this;
    }
    getContent() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFolder)
                return null;
            if (this.content === null) {
                const targetPath = path_1.concatPath(this.path, this.fileName);
                try {
                    const content = yield file_1.readFileContent(targetPath);
                    this.content = content;
                    this.freezeMethod();
                    return content;
                }
                catch (e) {
                    throw new Error(e);
                }
            }
            else {
                return this.content;
            }
        });
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
        this.children.push(fnode);
        // this.isChanged = true;
        this.freezeMethod();
        return this;
    }
    destroy() {
        if (this.isFileNode(this.parent)) {
            this.parent.removeChild(this);
            this.setParent(null);
        }
        this.freezeMethod();
    }
    removeChild(fnode) {
        const len = this.children.length;
        const newFileNodes = [];
        for (let i = 0; i < len; i++) {
            const node = this.children[i];
            if (node.fileName !== fnode.fileName) {
                newFileNodes.push(node);
            }
        }
        this.children = newFileNodes;
        // this.isChanged = true;
        this.freezeMethod();
    }
    setContent(newContent) {
        let res = true;
        try {
            this.content = newContent;
            // this.isChanged = true;
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
    setPath(path) {
        this.path = path;
    }
    setRootPath(rPath) {
        this.rootPath = rPath;
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