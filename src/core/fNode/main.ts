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
    /** 是否被改变过 */
    isChanged:boolean
    /** 添加一个fileNode到children中 */
    appendChild(fileNode:fileNodeContent):fileNodeContent
    /** 移除本身 */
    remove():void
}

export default class fileNode implements fileNodeContent {
    parent = null;
    children = [];
    content;
    isFolder = false;
    fileName = '';
    rootPath = '';
    path = '';
    isChanged = false
    constructor(name:string,path?:string,rootPath?:string,content?:any,isFolder?:boolean,parent:fileNode|null=null){
        this.fileName = name;
        this.path = checkPathIsUseful(path)? path: getCurrentPath();
        this.rootPath = rootPath?rootPath:parseRootPath(this.path);
        this.content = content?? '';
        this.isFolder = isFolder??false;
    }

    appendChild(fnode){
        return this
    }
    
    remove(){
        
    }
}