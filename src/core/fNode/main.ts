import {checkPathIsUseful,getCurrentPath, parseRootPath,concatPath} from '../../utils/path'

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
    parent:fileNode | null = null;
    children:fileNode[] = [];
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

    appendChild(fnode:fileNode){
        if(this.isFileNode(fnode) === false){
            throw new Error(`expect type fileNode, but got other,please use create createFileNode function`)
        }
        if(this.isFolder === false){
            throw new Error(`${this.fileName} is not a folder!`)
        }
        this.children.push(this.normalizeChildFileNode(fnode));
        this.isChanged = true;
        return this
    }

    remove(){
        if(this.isFileNode(this.parent)){
            this.parent.children = this.parent.children.filter(node => node.fileName!==this.fileName)
        };
    }

    /**
     * 对path、rootPath、parent属性进行校验与格式化
     * @param fnode 
     * @return {fileNode}
     * @author chris lee
     * @Time 2021/02/06
     */
    private normalizeChildFileNode(fnode:fileNode):fileNode {
        if(fnode.path !== this.path){
            fnode.path = concatPath(this.path,this.fileName)
        }
        if(fnode.rootPath !== this.rootPath){
            fnode.rootPath = this.rootPath;
        }
        fnode.parent = this;
        return fnode
    }
    
    /**
     * 判断是否为fileNode
     * @param target 
     * @author chris lee
     * @Time 2021/02/06
     */
    private isFileNode(target:null|fileNode):target is fileNode {
        let result = false
        if(target!==null && target.path && target.fileName && target.rootPath){
            result = true
        }
        return result
    }

    /**
     * 
     * @param res 
     */
    private formatPath(res){
        this.path = res
    }
}