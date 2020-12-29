import * as inquirer from 'inquirer';
import {log} from '../../utils/log';
import * as gitDownload from 'download-git-repo';
import {checkPathIsUseful,getCurrentPath, parseRootPath} from '../../utils/path'
/** 文件节点 */
export interface fileNode {
    /** 文件路径 */
    path:string,
    /** 根路径 */
    rootPath:string,
    /** 文件名称 */
    fileName:string,
    /** 是否文件夹 */
    isFolder:boolean
    /** 文件内容 string或buffer */
    content:any,
    /** 父级目录 */
    parent:fileNode | null,
    /** 子级目录包含的文件节点 */
    children:fileNode[]
}
/**
 * 使用命令交互指令
 * @param question 命令行提问配置
 * @returns {any} 返回终端用户输入内容
 */
const useCommand = async <T>(question:inquirer.Question<T>, property:string):Promise<any> => {
    const result = await inquirer.prompt([question]);
    return result[property]
}

const templateDownload = async (url:string,path:string):Promise<void>  => {
    // console.log("url=============>",url)
    return new Promise((resolve, reject) => {
            gitDownload(url,path,{clone:true},(err) => {
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        
    })
}

const createFileNode = (name:string,path?:string,rootPath?:string,content?:any,isFolder?:boolean):fileNode => {
    const fileName:string = name;
    const _path = checkPathIsUseful(path)? path: getCurrentPath();
    const _rootPath = rootPath?rootPath:parseRootPath(_path);
    const _content = content?? '';
    const _isFolder = isFolder??false;
    const node:fileNode = {
        path:_path,
        fileName,
        rootPath:_rootPath,
        content:_content,
        isFolder:_isFolder,
        parent:null,
        children:[]
    }
    return node
}

export default {
    useCommand,
    log,
    templateDownload,
    createFileNode
}