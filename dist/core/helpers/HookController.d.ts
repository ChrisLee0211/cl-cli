import Utils from './UtilsLib';
import { Ctx } from '../context';
export interface HookCL<T = any> {
    register<T>(type: 'init', fn: initFn<T>): void;
    register<T>(type: 'parse', fn: parseFn<T>): void;
    register<T>(type: 'transform', fn: transFn<T>): void;
    emitter<T>(type: 'init', args: [T, typeof Utils]): any;
    emitter<T>(type: 'parse', args: []): any;
    emitter<T>(type: 'transform', args: []): any;
}
/** 通过ctx增删复写配置 */
export declare type initFn<T> = (ctx: Ctx<T>) => void;
/** 通过ruleSetter自定义配置解析规则 */
export declare type parseFn<T> = (ruleSetter: any) => void;
/** 最后机会修改输出文件内容 */
export declare type transFn<T> = (fileMemory: any) => void;
declare class HookController implements HookCL {
    initEvents: Array<Function>;
    parseEvents: Array<Function>;
    transformEvents: Array<Function>;
    constructor();
    /**
     * 注册钩子
     * @param type 生命周期钩子
     * @param fn 回调函数
     */
    register<T>(type: 'init', fn: initFn<T>): void;
    register<T>(type: 'parse', fn: parseFn<T>): void;
    register<T>(type: 'transform', fn: transFn<T>): void;
    /**
     * 执行钩子
     * @param type 生命周期钩子类型
     * @returns {void}
     */
    emitter<T>(type: 'init', args: [T, typeof Utils]): any;
    emitter<T>(type: 'parse', args: []): any;
    emitter<T>(type: 'transform', args: []): any;
    private checkHookType;
}
declare const _default: HookController;
export default _default;
