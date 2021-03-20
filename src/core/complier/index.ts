import utils from "../helpers/UtilsLib";
import * as path from "path";
import {readFileContent, scanFolder, createFile} from "../../utils/file";
import FileTree from "../fileTree"; 
import FileNode from "../fnode/main"; 
import {Stack} from "../../utils/stack";
import {CoreParser} from "../parser";
import {concatPath} from "../../utils/path";

interface CoreComplierInterface {
    fileTree : FileTree | undefined,
    /** 获取fileTree */
    getFileTree():FileTree|undefined,
    /** 将本地拉取的模版目录编译成fileTree */
    complieLocalTemplate():void;
    /** 将传入的fileList依次解析覆盖最新的fileTree */
    complierExtra(ctx:any,fileList:CoreParser["parseFnTree"]):void
    /** 注册一个在output期间遍历fileTree时的需要执行副作用的回调函数 */
    setEffect(fn:outputCallback):void
    /** 将fileTree生成为真实文件 */
    output():void
}

type outputCallback = (cur:FileNode) => Promise<void>;
export default class CoreComplier implements CoreComplierInterface{
    fileTree:FileTree|undefined;
    rootFileNode:FileNode | undefined;
    extraTree:FileNode | undefined = undefined;
    outputCbs:Array<outputCallback> = [];
    projectName:string;
    projectPath:string;
    constructor(name:string, path:string){
        this.rootFileNode = this.createBaseFileNode(name, path);
        this.fileTree = new FileTree(this.rootFileNode)
        this.projectName = name;
        this.projectPath = path;
        this.setEffect = this.setEffect.bind(this);
    }
    /**
     * 返回一个只读的fileTree
     */
    getFileTree():FileTree |undefined{
        return this.fileTree;
    }
    /**
     * 构建fileTree顶端节点
     * @param pathName 根文件入口路径
     * @author chris lee
     * @Time 2021/01/14
     */
    private createBaseFileNode(fileName, pathName):FileNode{
        const rootFileNode = utils.createFileNode(
            fileName,
            process.cwd(),
            pathName,
            null,
            true,
        );
        return rootFileNode;
    }

    /**
     * 解析拉取下来的模版文件目录为fileTree
     * @param pathName 路径名
     * @author chrislee
     * @Time 2021/01/14
     */
    async complieLocalTemplate(){
        const projectPath = this.projectPath
        try{
            const stack = new Stack();
            if(this.fileTree!==undefined){
                stack.push(this.fileTree);
                while(stack.length>0){
                    const curNode = stack.pop() as FileNode;
                    if(curNode.isFolder){
                        // 如果是文件夹类型，那么先创建一个不含content的fileNode完成树结构，等下一轮遍历再补全content
                        const files = await scanFolder(path.join(curNode.path,curNode.fileName));
                        if(files.length){
                            const len = files.length;
                            for(let i=0;i<len;i++){
                                const fileName = files[i].name;
                                const isFolder = files[i].isDirectory();
                                const curPath = path.join(curNode.path,curNode.fileName)
                                const rootPath = (projectPath);
                                const parent = curNode;
                                const curFileNode = utils.createFileNode(fileName, curPath, rootPath, null, isFolder, parent);
                                curNode.appendChild(curFileNode);
                                stack.push(curFileNode);
                            }
                        }
                    }
                }
            }else{
                throw new Error("Fail to complier local template");
            }
        }catch(e){
            console.error(e);
        }
    }

    /**
     * 解析parse阶段的树变为fileNode
     * @param list parse阶段解析出来的parseTree
     * @author chris lee
     * @Time 2021/02/14
     */
    async complierExtra(ctx:any,list:CoreParser["parseFnTree"]){
        const fileList = [...list];
        if(!fileList.length) return this.fileTree;
        if(this.fileTree === undefined) throw new Error('Fail to parse local template')
        while(fileList.length){
            const cb = fileList.shift();
            if(cb){
                const fn = cb;
                try{
                    const keys = Object.keys(ctx);
                        for(let i=0;i<keys.length;i++){
                            const key = keys[i];
                            const value = ctx[key];
                            await fn(key,value,this.fileTree);
                        }
                }catch(e){
                    throw new Error(e);
                }
            }
        }
        return this.fileTree;
    }

    private isFileNode(node): node is FileNode {
        const keys = ["path", "rootPath", "fileName", "isFolder", "content", "parent", "children"];
        const nodeKeys = Object.keys(node);
        if(keys.length < nodeKeys.length) return false;
        let res = true;
        for(let i=0;i<keys.length;i++){
            if(nodeKeys.includes(keys[i])===false){
                res = false;
                break;
            }
        }
        return res;
    }

    /**
     * 注册副作用函数供编译outpuy时调用
     * @param fn 副作用函数
     * @author chris lee
     * @Time 2021/02/14
     */
    setEffect(fn:outputCallback) {
        this.outputCbs.push(fn);
    }

    /**
     * 执行副作用函数
     * @param fnode 当前遍历的fnode
     * @param effects 副作用函数队列
     * @author chris lee
     * @Time 2021/02/14
     */
    private async useEffect(fnode:FileNode, effects:outputCallback[]) {
        try{
            while(effects.length){
                const fn = effects.pop();
                if(fn){
                    await fn(fnode);
                }
            }
        }catch(e){
            throw new Error("Fail to call effect! please checked the param in setEffect");
        }
        return fnode;
    }
    
    async output(){
        if(this.fileTree === undefined) throw new Error(`fileTree is undefined!`)
        const stack = new Stack();
        stack.push(this.fileTree.getRoot());
        while(stack.length){
            const curNode = stack.pop() as FileNode;
            this.useEffect(curNode, this.outputCbs);
            if(curNode.children.length){
                for(let i = 0; i < curNode.children.length; i++){
                    stack.push(curNode.children[i]);
                }
            }
            if(curNode.isChanged){
                try{
                    const content = await curNode.getContent();
                    await createFile(curNode.path, curNode.fileName, content);
                }catch(e){
                    throw new Error(`Fail to create file named ${curNode.fileName}, please check its path or other porperty`);
                }
            }
        };
        this.fileTree = undefined;
    }
}