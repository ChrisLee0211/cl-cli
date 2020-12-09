import Utils from '../helpers/UtilsLib';
/**
 * 一个配置项可转化的资源节点，是描述一项配置的最细粒度单元，用于生成具体文件
 */
interface parseNode {
    /** 对应解析配置的key */
    target: string,
    /** 对应配置的解析操作 */
    operate:(val:any,utils:typeof Utils)=>void
}

export class CoreParser {

}