import FileNode from "../fNode/main";
import FileTree from "../fileTree";

type ruleSetterFn = (key:string,value:string,fileTree:FileTree)=>Promise<FileNode>
export class CoreParser {
    parseFnTree:ruleSetterFn[] = [];

    constructor(){
        this.ruleSetter = this.ruleSetter.bind(this);
    }
    /**
     * 注册解析规则
     * @param fn 解析函数
     */
    ruleSetter(fn:ruleSetterFn){
        this.parseFnTree.push(fn);
    }

    /**
     * 获取解析规则数
     * @returns {parseFnTree}
     * 
     */
    getParseFnTree(){
        return this.parseFnTree;
    }
}

export default new CoreParser();