import FileNode from "../fNode/main";


type ruleSetterFn = (key:string,value:string,fileTree:FileNode)=>Promise<FileNode>
export class CoreParser {
    parseFnTree:ruleSetterFn[] = [];


    constructor(){
        this.ruleSetter = this.ruleSetter.bind(this);
    }
    ruleSetter(fn:ruleSetterFn){
        this.parseFnTree.push(fn);
    }

    getParseFnTree(){
        return this.parseFnTree;
    }
}

export default new CoreParser();