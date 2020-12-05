import {typeValidate} from '../utils/typeValidate';
import HookController from './helpers/HookController';
import {Ctx} from './context';
import Utils from './helpers/UtilsLib';
import {checkFileIsBuilt} from '../utils/file';
import {getCurrentPath,concatPath} from '../utils/path';

type PluginFunction = (registerFn:typeof HookController['register'], utils:any)=>void
type Plugin =PluginFunction

function isPluginFn(fn): fn is PluginFunction {
    return typeValidate(fn,'function')
}

class ClCore {
    pluginsQueue:Array<Plugin> = [];
    ctx:any;

    public use(plugin:Plugin){
        this.pluginsQueue.push(plugin);
    }
    
    private installPlugins(){
        const cliUtils:typeof Utils = Utils; // prompt\gitDownload
        const registerFn = HookController.register;
        while(this.pluginsQueue.length){
            const plugin = this.pluginsQueue.pop();
            if(isPluginFn(plugin)){
                // 插件内部只有注册钩子的能力，没有触发能力，触发由core控制
                plugin(registerFn,cliUtils)
            }
            
        }
    }

    public async createCli(name) {
        const path = getCurrentPath();
        const isBuild = await checkFileIsBuilt(concatPath(path,name));
        let projectName = name;
        this.ctx = new Ctx(projectName);
        
        HookController.emitter('init',[this.ctx,Utils])
    }
}