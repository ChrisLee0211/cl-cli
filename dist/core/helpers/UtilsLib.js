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
const main_1 = require("../fNode/main");
const proxy_1 = require("../fNode/proxy");
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
/**
 * 创建虚拟文件节点
 * @param name 文件名称
 * @param path 文件路径
 * @param rootPath 根路径
 * @param content 文件内容
 * @param isFolder 是否文件夹
 * @param parent 父节点
 * @returns
 */
const createFileNode = (name, path, rootPath, content, isFolder, parent = null) => {
    const fileName = name;
    const _path = path_1.checkPathIsUseful(path) ? path : path_1.getCurrentPath();
    const _rootPath = rootPath ? rootPath : path_1.parseRootPath(_path);
    const _content = content !== null && content !== void 0 ? content : null;
    const _isFolder = isFolder !== null && isFolder !== void 0 ? isFolder : false;
    const node = new main_1.default(fileName, _path, _rootPath, _content, _isFolder, parent);
    return proxy_1.default(node);
};
exports.default = {
    useCommand,
    log: log_1.log,
    progressBar: log_1.progressBar,
    createFileNode,
    clearLog: log_1.clearLog
};
//# sourceMappingURL=UtilsLib.js.map