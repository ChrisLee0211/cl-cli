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
    getProjectName(name: any): Promise<string>;
    renderProgressBar(): void;
    destoryProgerssBar(): Promise<void>;
}
export {};
