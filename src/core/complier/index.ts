import utils from "../helpers/UtilsLib";
import * as path from 'path';
import {readFileContent,scanFolder} from '../../utils/file';
import FileNode from '../fNode/main'; 
import {Stack} from '../../utils/stack'
import {CoreParser} from '../parser'

interface CoreComplierInterface {
    fileTree : FileNode | undefined,
    /** 获取fileTree */
    getFileTree():Readonly<FileNode>|undefined,
    /** 构建基础fileNode */
    // createBaseFileNode(pathName:string):FileNode
    /** 将本地拉取的模版目录编译成fileTree */
    complierLocalTemplate(name,path):void;
    /** 将传入的fileList依次解析覆盖最新的fileTree */
    complierExtra(fileList:CoreParser['parseTree']):void
    /** 注册一个在output期间遍历fileTree时的需要执行副作用的回调函数 */
    setEffect(fn:outputCallback):void
    /** 将fileTree生成为真实文件 */
    output():void
}

type outputCallback = (cur:FileNode) => Promise<void>;
export default class CoreComplier implements CoreComplierInterface{
    fileTree:FileNode | undefined = undefined;
    extraTree:FileNode | undefined = undefined;
    outputCbs:Array<outputCallback> = [];
    constructor(name:string,path:string){
        this.fileTree = this.createBaseFileNode(name,path);
        this.complierLocalTemplate(name,path);
        this.setEffect = this.setEffect.bind(this)
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
    private createBaseFileNode(fileName,pathName):FileNode{
        const rootFileNode = utils.createFileNode(
            fileName,
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
    async complierLocalTemplate(projectName:string,projectPath:string){
        const pathName = path.join(projectPath,projectName)
        try{
            const stack = new Stack();
            if(this.fileTree!==undefined){
                stack.push(this.fileTree);
                while(stack.length>0){
                    const curNode = stack.pop() as FileNode;
                    if(curNode.isFolder){
                        // 如果是文件夹类型，那么先创建一个不含content的fileNode完成树结构，等下一轮遍历再补全content
                        const files = await scanFolder(pathName);
                        if(files.length){
                            const len = files.length;
                            for(let i=0;i<len;i++){
                                const curPath = path.join(curNode.path);
                                const rootPath = projectPath;
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
                                throw new Error(e)
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

    async complierExtra(list:CoreParser['parseTree']){
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
                        const result = await fn(this.extraTree);
                        if(this.isFileNode(result)){
                            this.extraTree = result
                        }
                    }
                }catch(e){
                    throw new Error(e)
                }
            }
        };
        this.fileTree = this.extraTree;
        return this.fileTree
    }

    private fileTreeIsDone(tree, list:any[]): tree is FileNode {
        if(list.length){
            return true
        }
        return false
    }

    private isFileNode(node): node is FileNode {
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

    setEffect(fn:outputCallback) {
        this.outputCbs.push(fn)
    }

    private async useEffect(fnode:FileNode, effects:outputCallback[]) {
        try{
            while(effects.length){
                const fn = effects.pop();
                if(fn){
                    await fn(fnode)
                }
            }
        }catch(e){
            throw new Error(`Fail to call effect! please checked the param in setEffect`)
        }
        return fnode
    }

    output(){
        const stack = new Stack();
        
    }
}