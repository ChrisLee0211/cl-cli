import FileNode from "../fNode/main";


type ruleSetterFn = (fileTree:FileNode)=>Promise<FileNode>
export class CoreParser {
    parseTree:{[key:string]:ruleSetterFn}[] = [];


    constructor(){
        this.ruleSetter = this.ruleSetter.bind(this);
    }
    ruleSetter<C>(key:keyof C, fn:ruleSetterFn){
        const result = {} as any;
        result[key] = fn
        this.parseTree.push(result)
    }

    getParseTree(){
        return this.parseTree
    }
}

export default new CoreParser()