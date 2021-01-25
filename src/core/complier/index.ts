import utils, { fileNode } from "../helpers/UtilsLib";
import * as path from 'path';
import * as fs from 'fs';
import {readFileContent,scanFolder} from '../../utils/file';
import {Stack} from '../../utils/stack'
import {CoreParser} from '../parser'

interface CoreComplierInterface {
    fileTree : fileNode | undefined,
    /** 获取fileTree */
    getFileTree():fileNode|undefined,
    /** 构建基础fileNode */
    // createBaseFileNode(pathName:string):fileNode
    /** 将本地拉取的模版目录编译成fileTree */
    complierLocalTemplate(path):void;
    /** 将传入的fileList依次插入到fileTree */
    complierExtra(fileList:CoreParser['parseTree']):void
    /** 将fileTree生成为真实文件 */
    output():void
}

type fileNodeType = fileNode

export default class CoreComplier implements CoreComplierInterface{
    fileTree:fileNode | undefined = undefined;
    extraTree:fileNode | undefined = undefined;
    constructor(path:string){
        this.fileTree = this.createBaseFileNode(path);
        this.complierLocalTemplate(path)
    }
    /**
     * 返回一个只读的fileTree
     */
    getFileTree(){
        return Object.freeze(this.fileTree)
    }
    /**
     * 构建fileTree顶端节点
     * @param pathName 根文件入口路径
     * @author chris lee
     * @Time 2021/01/14
     */
    private createBaseFileNode(pathName):fileNode{
        const rootFileNode = utils.createFileNode(
            path.basename(pathName),
            pathName,
            pathName,
            null,
            true,
            );
        return rootFileNode
    }

    /**
     * 解析拉取下来的模版文件目录为fileTree
     * @param pathName 路径名
     * @author chrislee
     * @Time 2021/01/14
     */
    async complierLocalTemplate(pathName:string){
        try{
            const stack = new Stack();
            if(this.fileTree!==undefined){
                stack.push(this.fileTree);
                while(stack.length>0){
                    const curNode = stack.pop() as fileNode;
                    if(curNode.isFolder){
                        // 如果是文件夹类型，那么先创建一个不含content的fileNode完成树结构，等下一轮遍历再补全content
                        const files = await scanFolder(pathName);
                        if(files.length){
                            const len = files.length;
                            for(let i=0;i<len;i++){
                                const curPath = path.join(curNode.path,files[i].name);
                                const rootPath = pathName;
                                const isFolder = files[i].isDirectory();
                                const fileName = files[i].name;
                                const parent = curNode;
                                const curFileNode = utils.createFileNode(fileName,curPath,rootPath,null,isFolder,parent);
                                curNode.children.push(curFileNode);
                                stack.push(curFileNode)
                            }
                        }
                    }else{
                        // 如果不是文件夹类型，那么就开始尝试读取content
                        if(curNode.content === null){
                            try{
                                curNode.content = await readFileContent(curNode.path);
                            }catch(e){
                                console.error(e)
                            }
                        }
                        
                    }
                }
            }else{
                throw new Error(`Fail to complier local template`)
            }
        }catch(e){
            console.error(e)
        }
    };

    complierExtra(list:CoreParser['parseTree']){
        const fileList = list;
        if(fileList.length && this.fileTree){
            this.extraTree = this.fileTree;
        }
        while(fileList.length){
            const cb = fileList.pop();
            if(cb){
                const key = Object.keys(cb??{})[0];
                const fn = cb[key]
                try{
                    if(this.fileTreeIsDone(this.extraTree,list)){
                        const result = fn(this.extraTree);
                        if(this.isFileNode(result)){
                            this.extraTree = result
                        }
                    }
                }catch(e){
    
                }
            }
        }
    }

    fileTreeIsDone(tree, list:any[]): tree is fileNode {
        if(list.length){
            return true
        }
        return false
    }

    isFileNode(node): node is fileNode {
        const keys = ['path', 'rootPath', 'fileName', 'isFolder', 'content', 'parent', 'children'];
        const nodeKeys = Object.keys(node);
        if(keys.length !== nodeKeys.length) return false
        let res = true;
        for(let i=0;i<keys.length;i++){
            if(nodeKeys.includes(keys[i])===false){
                res = false;
                break
            }
        }
        return res
    }

    output(){

    }
}