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
    parent:fileNode,
    /** 子级目录包含的文件节点 */
    children?:fileNode[]
}

interface CoreComplierInterface {
    fileTree : fileNode | undefined,
    /** 创建fileNode */
    createFileNode(name:string,path?:string,content?:any,isFolder?:boolean):fileNode
    /** 将本地拉取的模版目录编译成fileTree */
    complierLocalTemplate():void;
    /** 将传入的fileList依次插入到fileTree */
    complierExtra(fileList:fileNode[]):void
    /** 将fileTree生成为真实文件 */
    output():void
}

export class CoreComplier implements CoreComplierInterface{
    fileTree;

    createFileNode(name:string,path?:string,content?:any,isFolder?:boolean){
        return {} as fileNode
    }

    complierLocalTemplate(){

    };

    complierExtra(list){

    }

    output(){

    }
}