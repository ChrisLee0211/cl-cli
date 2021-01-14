import utils, { fileNode } from "../helpers/UtilsLib";
import * as path from 'path';
import * as fs from 'fs';
import {readFileContent} from '../../utils/file';

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

    /**
     * 构建fileTree顶端节点
     * @param pathName 根文件入口路径
     * @author chris lee
     * @Time 2021/01/14
     */
    private createBaseFileNode(pathName){
        return new Promise((rs,rj) => {
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
                    const curPath = pathName;
                    const rootPath = pathName;
                    const isFolder = files[i].isDirectory();
                    const fileName = files[i].name;
                    const parent = rootFileNode;
                    const curFileNode = utils.createFileNode(fileName,curPath,rootPath,null,isFolder,parent);
                    rootFileNode.children.push(curFileNode)
                   }
                   rs(rootFileNode)
                }else{
                    console.error(err)
                    rj(err)
                }
            })
        })
    }

    /**
     * 解析拉取下来的模版文件目录为fileTree
     * @param pathName 路径名
     * @author chrislee
     * @Time 2021/01/14
     */
    async complierLocalTemplate(pathName:string){
        try{
            this.fileTree = await this.createBaseFileNode(pathName)
        }catch(e){
            console.error(e)
        }
    };

    complierExtra(list){

    }

    output(){

    }
}