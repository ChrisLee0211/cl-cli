import * as inquirer from "inquirer";
import {log, progressBar, clearLog} from "../../utils/log";
import FileNode from "../fNode/main";
import proxyWrapper from "../fNode/proxy";
import {checkPathIsUseful, getCurrentPath, parseRootPath} from "../../utils/path";

/**
 * 使用命令交互指令
 * @param question 命令行提问配置
 * @returns {any} 返回终端用户输入内容
 */
const useCommand = async <T>(question:inquirer.Question<T>, property:string):Promise<any> => {
    const result = await inquirer.prompt([question]);
    return result[property];
};

const createFileNode = (name:string, path?:string, rootPath?:string, content?:any, isFolder?:boolean, parent:FileNode|null=null):FileNode => {
    const fileName:string = name;
    const _path = checkPathIsUseful(path)? path: getCurrentPath();
    const _rootPath = rootPath?rootPath:parseRootPath(_path);
    const _content = content?? null;
    const _isFolder = isFolder??false;
    const node:FileNode = new FileNode(fileName, _path, _rootPath, _content, _isFolder,parent);
    return proxyWrapper(node);
};

export default {
    useCommand,
    log,
    progressBar,
    createFileNode,
    clearLog
};