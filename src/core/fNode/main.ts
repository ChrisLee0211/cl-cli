import {checkPathIsUseful, getCurrentPath, parseRootPath, concatPath} from "../../utils/path";
import {readFileContent} from  "../../utils/file";
/** 文件节点内容 */
export interface fileNodeContent {
    /** id标识 */
    id:string,
    /** 文件路径 */
    path:string,
    /** 根路径 */
    rootPath:string,
    /** 文件名称 */
    fileName:string,
    /** 是否文件夹 */
    isFolder:boolean
    /** 文件内容 string或buffer */
    // content:any,
    /** 父级目录 */
    parent:fileNode | null,
    /** 子级目录包含的文件节点 */
    children:fileNode[]
    /** 是否被改变过 */
    isChanged:boolean
    /** 获取文件内容 */
    getContent():Promise<any>
    /** 添加一个fileNode到children中 */
    appendChild(fileNode:fileNodeContent):fileNodeContent
    /** 销毁本身 */
    destroy():void
    /** 销毁指定子节点 */
    removeChild(fnode:fileNodeContent):void
    /** 设置文件内容 */
    setContent(newContent:any):boolean
}

export default class fileNode implements fileNodeContent {
    id:string;
    parent:fileNode | null = null;
    children:fileNode[] = [];
    private content;
    isFolder = false;
    fileName = "";
    rootPath = "";
    path = "";
    isChanged;
    constructor(name:string, path?:string, rootPath?:string, content?:any, isFolder?:boolean, parent:fileNode|null=null){
        this.fileName = name;
        this.path = checkPathIsUseful(path)? path: getCurrentPath();
        this.rootPath = rootPath?rootPath:parseRootPath(this.path);
        this.isFolder = isFolder??false;
        this.isChanged = false;
        this.parent = parent;
        this.setContent(content??null);
        this.id = this.path+this.fileName;
        return this;
    }

    async getContent(){
        if(this.isFolder) return null
        if(this.content===null){
            const targetPath = concatPath(this.path,this.fileName);
            try{
                const content = await readFileContent(targetPath);
                this.content = content;
                this.freezeMethod()
                return content
            }catch(e){
                throw new Error(e)
            }
        }else{
            return this.content
        }
    }


    appendChild(fnode:fileNode){
        if(this.isFileNode(fnode) === false){
            throw new Error("expect type fileNode, but got other,please use create createFileNode function");
        }
        if(this.isFolder === false){
            throw new Error(`${this.fileName} is not a folder!`);
        }
        try{
            const len = this.children.length;
            for(let i=0;i<len;i++){
                const child = this.children[i];
                if(child.fileName === fnode.fileName){
                    throw new Error(`The file ${fnode.fileName} was already exist!`);
                }
            }
        }catch(e){
            console.error(e);
        }
        this.children.push(fnode);
        // this.isChanged = true;
        this.freezeMethod();
        return this;
    }

    destroy(){
        if(this.isFileNode(this.parent)){
            this.parent.removeChild(this);
            this.setParent(null);
        }
        this.freezeMethod();
    }

    removeChild(fnode:fileNode){
        const len = this.children.length;
        const newFileNodes:fileNode[] = []
        for(let i = 0 ;i<len;i++){
            const node = this.children[i];
            if(node.fileName!==fnode.fileName){
                newFileNodes.push(node);
            }
        }
        this.children = newFileNodes;
        // this.isChanged = true;
        this.freezeMethod();
    }

    setContent(newContent){
        let res = true;
        try{
            this.content = newContent;
            // this.isChanged = true;
        }catch(e){
            console.error(e);
            res = false;
        }
        this.freezeMethod();
        return res;
    }

    setParent(fnode:fileNode|null) {
        this.parent = fnode;
    }
    setPath(path:string){
        this.path = path
    }
    setRootPath(rPath:string){
        this.rootPath = rPath
    }
    
    /**
     * 判断是否为fileNode
     * @param target 
     * @author chris lee
     * @Time 2021/02/06
     */
    private isFileNode(target:null|fileNode):target is fileNode {
        let result = false;
        if(target!==null && target.path && target.fileName && target.rootPath){
            result = true;
        }
        return result;
    }

    private freezeMethod(){
        return false;
    }
}