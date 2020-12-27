import Utils, { fileNode } from '../helpers/UtilsLib';

export class CoreParser {
    parseTree:{[key:string]:fileNode}[] = [];


    constructor(){
        this.ruleSetter = this.ruleSetter.bind(this);
    }
    ruleSetter<C>(key:keyof C, fileNode:fileNode){
        const result = {} as any;
        result[key] = fileNode
        this.parseTree.push(result)
    }

    getParseTree(){
        return this.parseTree
    }
}

export default new CoreParser()