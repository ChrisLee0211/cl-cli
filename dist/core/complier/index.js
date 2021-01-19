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
    constructor(path) {
        this.fileTree = undefined;
        this.fileTree = this.createBaseFileNode(path);
        this.complierLocalTemplate(path);
    }
    /**
     * 构建fileTree顶端节点
     * @param pathName 根文件入口路径
     * @author chris lee
     * @Time 2021/01/14
     */
    createBaseFileNode(pathName) {
        const rootFileNode = UtilsLib_1.default.createFileNode(path.basename(pathName), pathName, pathName, null, true);
        return rootFileNode;
    }
    /**
     * 解析拉取下来的模版文件目录为fileTree
     * @param pathName 路径名
     * @author chrislee
     * @Time 2021/01/14
     */
    complierLocalTemplate(pathName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stack = new stack_1.Stack();
                if (this.fileTree !== undefined) {
                    stack.push(this.fileTree);
                    while (stack.length > 0) {
                        const curNode = stack.pop();
                        if (curNode.isFolder) {
                            // 如果是文件夹类型，那么先创建一个不含content的fileNode完成树结构，等下一轮遍历再补全content
                            const files = yield file_1.scanFolder(pathName);
                            if (files.length) {
                                const len = files.length;
                                for (let i = 0; i < len; i++) {
                                    const curPath = path.join(curNode.path, files[i].name);
                                    const rootPath = pathName;
                                    const isFolder = files[i].isDirectory();
                                    const fileName = files[i].name;
                                    const parent = curNode;
                                    const curFileNode = UtilsLib_1.default.createFileNode(fileName, curPath, rootPath, null, isFolder, parent);
                                    curNode.children.push(curFileNode);
                                    stack.push(curFileNode);
                                }
                            }
                        }
                        else {
                            // 如果不是文件夹类型，那么就开始尝试读取content
                            if (curNode.content === null) {
                                try {
                                    curNode.content = yield file_1.readFileContent(curNode.path);
                                }
                                catch (e) {
                                    console.error(e);
                                }
                            }
                        }
                    }
                }
                else {
                    throw new Error(`Fail to complier local template`);
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    ;
    complierExtra(list) {
    }
    output() {
    }
}
exports.default = CoreComplier;
//# sourceMappingURL=index.js.map