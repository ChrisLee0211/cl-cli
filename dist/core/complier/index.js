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
const UtilsLib_1 = require("../helpers/UtilsLib");
const path = require("path");
const file_1 = require("../../utils/file");
const stack_1 = require("../../utils/stack");
class CoreComplier {
    constructor(name, path) {
        this.extraTree = undefined;
        this.outputCbs = [];
        this.fileTree = this.createBaseFileNode(name, path);
        this.projectName = name;
        this.projectPath = path;
        this.setEffect = this.setEffect.bind(this);
    }
    /**
     * 返回一个只读的fileTree
     */
    getFileTree() {
        return this.fileTree;
    }
    /**
     * 构建fileTree顶端节点
     * @param pathName 根文件入口路径
     * @author chris lee
     * @Time 2021/01/14
     */
    createBaseFileNode(fileName, pathName) {
        const rootFileNode = UtilsLib_1.default.createFileNode(fileName, pathName, pathName, null, true);
        return rootFileNode;
    }
    /**
     * 解析拉取下来的模版文件目录为fileTree
     * @param pathName 路径名
     * @author chrislee
     * @Time 2021/01/14
     */
    complieLocalTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectPath = this.projectPath;
            try {
                const stack = new stack_1.Stack();
                if (this.fileTree !== undefined) {
                    stack.push(this.fileTree);
                    let preFileNode = null;
                    while (stack.length > 0) {
                        const curNode = stack.pop();
                        preFileNode = curNode;
                        if (curNode.isFolder) {
                            // 如果是文件夹类型，那么先创建一个不含content的fileNode完成树结构，等下一轮遍历再补全content
                            const files = yield file_1.scanFolder(path.join(curNode.path, curNode.fileName));
                            if (files.length) {
                                const len = files.length;
                                for (let i = 0; i < len; i++) {
                                    const fileName = files[i].name;
                                    const isFolder = files[i].isDirectory();
                                    const curPath = isFolder ? path.join(curNode.path) : path.join(curNode.path, fileName);
                                    const rootPath = (projectPath);
                                    const parent = curNode;
                                    const curFileNode = UtilsLib_1.default.createFileNode(fileName, curPath, rootPath, null, isFolder, parent);
                                    curNode.appendChild(curFileNode);
                                    curFileNode.setParent(curNode);
                                    // curFileNode.setPath(concatPath(curNode.path, curFileNode.fileName))
                                    stack.push(curFileNode);
                                }
                            }
                        }
                        else {
                            // 如果不是文件夹类型，那么就开始尝试读取content
                            if (curNode.content === null) {
                                try {
                                    // const content = await readFileContent(curNode.path);
                                    // curNode.setContent(content);
                                    // this.isFileNode(preFileNode) && curNode.setParent(preFileNode);
                                }
                                catch (e) {
                                    throw new Error(e);
                                }
                            }
                        }
                    }
                }
                else {
                    throw new Error("Fail to complier local template");
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    /**
     * 解析parse阶段的树变为fileNode
     * @param list parse阶段解析出来的parseTree
     * @author chris lee
     * @Time 2021/02/14
     */
    complierExtra(list) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileList = list;
            if (!fileList.length)
                return this.fileTree;
            if (fileList.length && this.fileTree) {
                this.extraTree = this.fileTree;
            }
            while (fileList.length) {
                const cb = fileList.pop();
                if (cb) {
                    const key = Object.keys(cb !== null && cb !== void 0 ? cb : {})[0];
                    const fn = cb[key];
                    try {
                        if (this.fileTreeIsDone(this.extraTree, list)) {
                            const result = yield fn(this.extraTree);
                            if (this.isFileNode(result)) {
                                this.extraTree = result;
                            }
                        }
                    }
                    catch (e) {
                        throw new Error(e);
                    }
                }
            }
            this.fileTree = this.extraTree;
            return this.fileTree;
        });
    }
    fileTreeIsDone(tree, list) {
        if (list.length) {
            return true;
        }
        return false;
    }
    isFileNode(node) {
        const keys = ["path", "rootPath", "fileName", "isFolder", "content", "parent", "children"];
        const nodeKeys = Object.keys(node);
        if (keys.length !== nodeKeys.length)
            return false;
        let res = true;
        for (let i = 0; i < keys.length; i++) {
            if (nodeKeys.includes(keys[i]) === false) {
                res = false;
                break;
            }
        }
        return res;
    }
    /**
     * 注册副作用函数供编译outpuy时调用
     * @param fn 副作用函数
     * @author chris lee
     * @Time 2021/02/14
     */
    setEffect(fn) {
        this.outputCbs.push(fn);
    }
    /**
     * 执行副作用函数
     * @param fnode 当前遍历的fnode
     * @param effects 副作用函数队列
     * @author chris lee
     * @Time 2021/02/14
     */
    useEffect(fnode, effects) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                while (effects.length) {
                    const fn = effects.pop();
                    if (fn) {
                        yield fn(fnode);
                    }
                }
            }
            catch (e) {
                throw new Error("Fail to call effect! please checked the param in setEffect");
            }
            return fnode;
        });
    }
    output() {
        return __awaiter(this, void 0, void 0, function* () {
            const stack = new stack_1.Stack();
            stack.push(this.fileTree);
            while (stack.length) {
                const curNode = stack.pop();
                this.useEffect(curNode, this.outputCbs);
                if (curNode.children.length) {
                    for (let i = 0; i < curNode.children.length; i++) {
                        stack.push(curNode.children[i]);
                    }
                }
                if (curNode.isChanged) {
                    try {
                        yield file_1.createFile(curNode.path, curNode.fileName, curNode.content);
                    }
                    catch (e) {
                        throw new Error(`Fail to create file named ${curNode.fileName}, please its path or other porperty`);
                    }
                }
            }
            ;
            this.fileTree = undefined;
        });
    }
}
exports.default = CoreComplier;
//# sourceMappingURL=index.js.map