import { Ctx } from "../context";
import { CoreParser } from "../parser";
import CoreComplier from "../complier";
import fileNode from "../fNode/main";
import fileTree from "../fileTree";
export interface HookCL<T = any> {
    register<T>(type: "init", fn: initFn<T>): void;
    register<T>(type: "parse", fn: parseFn<T>): void;
    register(type: "transform", fn: transFn): void;
    register(type: "finish", fn: finishFn): void;
    emitter<T>(type: "init", args: [T]): any;
    emitter<T>(type: "parse", args: [T, rset]): any;
    emitter(type: "transform", args: [CoreComplier["setEffect"]]): any;
    emitter(type: "finish", args: [fileTree | undefined]): any;
}
declare type lifeType = "init" | "parse" | "transform" | "finish";
declare type rset = CoreParser["ruleSetter"];
/** 通过ctx增删复写配置 */
export declare type initFn<T> = (ctx: Ctx<T>) => void;
/** 通过ruleSetter自定义配置解析规则 */
export declare type parseFn<T> = (ctx: T, ruleSetter: rset) => void;
/** 最后机会修改输出文件内容 */
export declare type transFn = (setEffectFn: CoreComplier["setEffect"]) => void;
/** 文件输出完成后执行附加操作 */
export declare type finishFn = (fileTree: Readonly<fileNode>) => void;
declare class HookController implements HookCL {
    initEvents: Array<Function>;
    parseEvents: Array<Function>;
    transformEvents: Array<Function>;
    finishEvents: Array<Function>;
    currentStep: lifeType;
    constructor();
    /**
    * 注册钩子
    * @param type 生命周期钩子
    * @param fn 回调函数
    */
    register<T>(type: "init", fn: initFn<T>): void;
    register<T>(type: "parse", fn: parseFn<T>): void;
    register<T>(type: "transform", fn: transFn): void;
    register<T>(type: "finish", fn: finishFn): void;
    /**
    * 执行钩子
    * @param type 生命周期钩子类型
    * @returns {void}
    */
    emitter<T>(type: "init", args: [T]): any;
    emitter<T>(type: "parse", args: [T, rset]): any;
    emitter<T>(type: "transform", args: [CoreComplier["setEffect"]]): any;
    emitter<T>(type: "finish", args: [fileTree | undefined]): any;
    private checkHookType;
}
declare const _default: HookController;
export default _default;
