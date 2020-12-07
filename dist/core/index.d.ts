import { HookCL } from './helpers/HookController';
import Utils from './helpers/UtilsLib';
declare type PluginFunction<T = any> = (registerFn: HookCL<T>['register'], utils: typeof Utils) => void;
export declare type Plugin<T = any> = PluginFunction<T>;
export declare class ClCore {
    pluginsQueue: Array<Plugin>;
    ctx: any;
    use(plugin: Plugin): this;
    private installPlugins;
    createCli(name: any): Promise<void>;
}
export {};
