import {checkPathIsUseful,getCurrentPath, parseRootPath} from '../../utils/path'

/** 文件节点内容 */
export interface fileNodeContent {
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

class fileNode {
    main:fileNodeContent | null = null
    constructor(name:string,path?:string,rootPath?:string,content?:any,isFolder?:boolean,parent:fileNode|null=null){
        const fileName:string = name;
        const _path = checkPathIsUseful(path)? path: getCurrentPath();
        const _rootPath = rootPath?rootPath:parseRootPath(_path);
        const _content = content?? '';
        const _isFolder = isFolder??false;
        const node:fileNodeContent = {
            path:_path,
            fileName,
            rootPath:_rootPath,
            content:_content,
            isFolder:_isFolder,
            parent:parent,
            children:[]
        }
        this.main = this.setProxy(node);
        return this
    }

    setProxy(fnode:fileNodeContent){
        return new Proxy(fnode,{

        })
    }

    
    
}