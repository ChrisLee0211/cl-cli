import Utils, { fileNode } from '../helpers/UtilsLib';

type ruleSetterFn = (fileTree:fileNode)=>fileNode|void
export class CoreParser {
    parseTree:{[key:string]:fileNode}[] = [];


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