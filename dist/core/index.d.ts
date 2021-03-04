/// <reference types="node" />
import { HookCL } from "./helpers/HookController";
import Utils from "./helpers/UtilsLib";
declare type PluginFunction<T = any> = (registerFn: HookCL<T>["register"], utils: typeof Utils) => void;
export declare type Plugin<T = any> = PluginFunction<T>;
export declare class ClCore {
    pluginsQueue: Array<Plugin>;
    ctx: any;
    barTimer: null | NodeJS.Timeout;
    OutPutPercent: number;
    use(plugin: Plugin): this;
    private installPlugins;
    createCli(name: any): Promise<void>;
    /**
     * 获取项目名称，重复则继续调用自身
     * @param name 项目名称
     * @author chris lee
     * @Time 2021/02/28
     */
    getProjectName(name: any): Promise<string>;
    /**
     *  渲染进度条
     * @author chris lee
     * @Time 2021/02/28
     */
    renderProgressBar(): void;
    /**
     *  销毁进度条
     * @author chris lee
     * @Time 2021/02/28
     */
    destoryProgerssBar(): Promise<void>;
}
export {};
