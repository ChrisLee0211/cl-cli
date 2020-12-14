import Utils from '../helpers/UtilsLib';


/**
 * 一个配置项可转化的资源节点，是描述一项配置的最细粒度单元，用于生成具体文件
 */
export interface parseNode<T, K extends keyof T = any> {
    /** 对应解析配置的key */
    target: K,
    /** 对应配置的解析操作 */
    operate:(val:T[K],utils:typeof Utils)=>any
}

export class CoreParser {
    parseTree:{[key:string]:any} = {};
    parseNodeList:parseNode<any>[] = [];

    constructor(){
        this.ruleSetter = this.ruleSetter.bind(this);
    }

    ruleSetter<C,K extends keyof C = any>(key:C[K],fn:parseNode<C,K>['operate']){
        const node:parseNode<C> = {
            target:key,
            operate:fn
        };
        this.parseNodeList.push(node);
    }

    async buildParseTree(){
        let len = this.parseNodeList.length;
        while(len>0){
            const cur = this.parseNodeList.pop() as parseNode<any>;
            const key = cur.target;
            const source = await cur.operate(key,Utils);
            this.parseTree[key] = source ?? null;
            len--
        }
    }
}