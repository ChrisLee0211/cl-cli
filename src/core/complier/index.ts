import { fileNode } from "../helpers/UtilsLib";


interface CoreComplierInterface {
    fileTree : fileNode | undefined,
    /** 创建fileNode */
    // createFileNode(name:string,path?:string,content?:any,isFolder?:boolean):fileNode
    /** 将本地拉取的模版目录编译成fileTree */
    complierLocalTemplate():void;
    /** 将传入的fileList依次插入到fileTree */
    complierExtra(fileList:fileNode[]):void
    /** 将fileTree生成为真实文件 */
    output():void
}



export class CoreComplier implements CoreComplierInterface{
    fileTree;


    complierLocalTemplate(){

    };

    complierExtra(list){

    }

    output(){

    }
}