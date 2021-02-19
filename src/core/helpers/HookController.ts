/* eslint-disable @typescript-eslint/ban-types */
import Utils from "./UtilsLib";
import {Ctx} from "../context";
import {CoreParser} from "../parser";
import CoreComplier from "../complier";
import fileNode from "../fNode/main";
export interface HookCL<T = any> {
    register<T>(type:"init", fn:initFn<T>):void
    register<T>(type:"parse", fn:parseFn<T>):void
    register<T >(type:"transform", fn:transFn<T>):void
    register<T>(type:"finish", fn:finishFn<T>): void
    emitter<T>(type:"init", args:[T, typeof Utils]);
    emitter<T>(type:"parse", args:[T, typeof Utils, rset]);
    emitter<T>(type:"transform", args:[typeof Utils, CoreComplier["setEffect"]]);
    emitter<T>(type:"finish", args:[Readonly<fileNode>, typeof Utils])
}

type lifeType = "init" | "parse" | "transform" | "finish"
type rset = CoreParser["ruleSetter"]
/** 通过ctx增删复写配置 */
export type initFn<T> = (ctx:Ctx<T>) => void
/** 通过ruleSetter自定义配置解析规则 */
export type parseFn<T> = (ctx:T, utils:typeof Utils, ruleSetter:rset) => void
/** 最后机会修改输出文件内容 */
export type transFn<T> = (utils:typeof Utils, setEffectFn:CoreComplier["setEffect"]) => void
/** 文件输出完成后执行附加操作 */
export type finishFn<T> = (fileTree:Readonly<fileNode>, utils: typeof Utils) => void

class HookController implements HookCL{
     initEvents:Array<Function> = []
     parseEvents:Array<Function> = []
     transformEvents:Array<Function> = []
     finishEvents:Array<Function> = []
     constructor(){
         this.register = this.register.bind(this);
         this.emitter = this.emitter.bind(this);
     }
     /**
     * 注册钩子
     * @param type 生命周期钩子
     * @param fn 回调函数
     */
     public register<T>(type:"init", fn:initFn<T>):void
     public register<T>(type:"parse", fn:parseFn<T>):void
     public register<T >(type:"transform", fn:transFn<T>):void
     public register<T>(type:"finish", fn:finishFn<T>): void
     public register<T>(type:lifeType, fn:Function):void{
         switch(type){
         case "init":
             this.initEvents.push(fn);
             break;
         case "parse":
             this.parseEvents.push(fn);
             break;
         case "transform":
             this.transformEvents.push(fn);
             break;
         case "finish":
             this.finishEvents.push(fn);
             break;
         default:
             this.checkHookType(type);
         }
     }

     /**
     * 执行钩子
     * @param type 生命周期钩子类型
     * @returns {void}
     */
     public emitter<T>(type:"init", args:[T, typeof Utils]);
     public emitter<T>(type:"parse", args:[T, typeof Utils, rset]);
     public emitter<T>(type:"transform", args:[typeof Utils, CoreComplier["setEffect"]]);
     public emitter<T>(type:"finish", args:[Readonly<fileNode>, typeof Utils])
     public async emitter(type:lifeType, args:any[]){
         let cb:Function | undefined;
         let queue: Array<Function>;
         switch(type){
         case "init":
             queue = this.initEvents;
             break;
         case "parse":
             queue = this.parseEvents;
             break;
         case "transform":
             queue = this.transformEvents;
             break;
         case "finish":
             queue = this.finishEvents;
             break;
         default:
             this.checkHookType(type);
             queue = [];
         }
         while(queue.length){
             cb = queue.pop();
             if(typeof(cb)==="function"){
                 await cb(...args);
             }else{
                 throw new Error("The lifeCylce callback expect a Function!");
             }
         }
     }

     private checkHookType(type:lifeType):lifeType{
         if(!["init", "parse", "transform", "finish"].includes(type)){
             throw new Error(`No such type like ${type}!`);
         }
         return type;
     }
}

export default new HookController();