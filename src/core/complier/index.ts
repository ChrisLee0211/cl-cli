import utils, { fileNode } from "../helpers/UtilsLib";
import * as path from 'path';
import * as fs from 'fs';

interface CoreComplierInterface {
    fileTree : fileNode | undefined,
    /** 创建fileNode */
    // createFileNode(name:string,path?:string,content?:any,isFolder?:boolean):fileNode
    /** 将本地拉取的模版目录编译成fileTree */
    complierLocalTemplate(pathName:string):void;
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

    complierLocalTemplate(pathName:string){
        // console.log('projectPath', path);
        fs.readdir(pathName,{withFileTypes:true},(err,files) => {
            if(!err){
               const rootFileNode = utils.createFileNode(
                   path.basename(pathName),
                   pathName,
                   pathName,
                   null,
                   true,
                   ) 
               const len = files.length;
               for(let i=0;i<len;i++){

               }
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