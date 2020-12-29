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
const inquirer = require("inquirer");
const log_1 = require("../../utils/log");
const gitDownload = require("download-git-repo");
const path_1 = require("../../utils/path");
/**
 * 使用命令交互指令
 * @param question 命令行提问配置
 * @returns {any} 返回终端用户输入内容
 */
const useCommand = (question, property) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield inquirer.prompt([question]);
    return result[property];
});
const templateDownload = (url, path) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("url=============>",url)
    return new Promise((resolve, reject) => {
        gitDownload(url, path, { clone: true }, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
});
const createFileNode = (name, path, rootPath, content, isFolder) => {
    const fileName = name;
    const _path = path_1.checkPathIsUseful(path) ? path : path_1.getCurrentPath();
    const _rootPath = rootPath ? rootPath : path_1.parseRootPath(_path);
    const _content = content !== null && content !== void 0 ? content : '';
    const _isFolder = isFolder !== null && isFolder !== void 0 ? isFolder : false;
    const node = {
        path: _path,
        fileName,
        rootPath: _rootPath,
        content: _content,
        isFolder: _isFolder,
        parent: null,
        children: []
    };
    return node;
};
exports.default = {
    useCommand,
    log: log_1.log,
    templateDownload,
    createFileNode
};
//# sourceMappingURL=UtilsLib.js.map