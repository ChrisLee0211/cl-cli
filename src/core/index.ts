import {typeValidate} from '../utils/typeValidate';
import HookController, {initFn,parseFn,transFn} from './helpers/HookController';

interface PluginObject {
    "init"?:initFn
    "parse"?:parseFn
    "transform"?:transFn
}
type PluginFunction = (registerFn:typeof HookController['register'], utils:any)=>void
type Plugin = PluginObject | PluginFunction

function isPluginFn(fn): fn is PluginFunction {
    return typeValidate(fn,'function')
}

function isPluginObj(fn): fn is PluginObject {
    return typeValidate(fn,'object')
}
class ClCore {
    pluginsQueue:Array<Plugin> = [];

    public use(plugin:any){
        this.pluginsQueue.push(plugin);
    }
    
    private installPlugins(){
        const cliUtils:any = {}; // prompt\gitDownload
        const registerFn = HookController.register;
        while(this.pluginsQueue.length){
            const plugin = this.pluginsQueue.pop();
            if(isPluginFn(plugin)){
                // 插件内部只有注册钩子的能力，没有触发能力，触发由core控制
                plugin(registerFn,cliUtils)
            }else if(isPluginObj(plugin)){
                
            }
            
        }
    }
}