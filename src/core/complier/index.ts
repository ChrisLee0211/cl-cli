import { fileNode } from "../helpers/UtilsLib";
import * as path from 'path';
import * as fs from 'fs';

interface CoreComplierInterface {
    fileTree : fileNode | undefined,
    /** 创建fileNode */
    // createFileNode(name:string,path?:string,content?:any,isFolder?:boolean):fileNode
    /** 将本地拉取的模版目录编译成fileTree */
    complierLocalTemplate(path:string):void;
    /** 将传入的fileList依次插入到fileTree */
    complierExtra(fileList:fileNode[]):void
    /** 将fileTree生成为真实文件 */
    output():void
}



export default class CoreComplier implements CoreComplierInterface{
    fileTree;
    constructor(path:string){
        this.complierLocalTemplate(path)
    }

    complierLocalTemplate(path:string){
        // console.log('projectPath', path);
        fs.readdir(path,{withFileTypes:true},(err,files) => {
            if(!err){
                debugger
                console.log('files',files)
            }else{
                console.error(err)
            }
        })
    };

    complierExtra(list){

    }

    output(){

    }
}