import {typeValidate} from '../utils/typeValidate';
import HookController,{HookCL} from './helpers/HookController';
import {Ctx} from './context';
import Utils from './helpers/UtilsLib';
import {checkFileIsBuilt} from '../utils/file';
import {getCurrentPath,concatPath} from '../utils/path';

type PluginFunction<T = any> = (registerFn:HookCL<T>['register'], utils: typeof Utils)=>void
export type Plugin<T = any> = PluginFunction<T>

function isPluginFn(fn): fn is PluginFunction {
    return typeValidate(fn,'function')
}

export class ClCore {
    pluginsQueue:Array<Plugin> = [];
    ctx:any;

    public use(plugin:Plugin){
        this.pluginsQueue.push(plugin);
        return this
    }
    
    private installPlugins(){
        const cliUtils:typeof Utils = Utils; // prompt\gitDownload
        const registerFn = HookController.register;
        let len = this.pluginsQueue.length
        while(len){
            const plugin = this.pluginsQueue.pop();
            if(isPluginFn(plugin)){
                // 插件内部只有注册钩子的能力，没有触发能力，触发由core控制
                plugin(registerFn,cliUtils)
            };
            len--
            
        }
    }

    public async createCli(name) {
        this.installPlugins();
        const path = getCurrentPath();
        const isBuild = await checkFileIsBuilt(concatPath(path,name));
        let projectName = name;
        if(isBuild){
            Utils.log(`项目已在当前目录已存在，请重新命名`,'warning');
            const renameCommand = {
                type:"input",
                message: '请输入项目名',
                name: 'name',
                default: 'my-project'
            }
            const answer = await  Utils.useCommand<{'name':string}>(renameCommand,'name');
            projectName = answer;
        }
        this.ctx = new Ctx(projectName);

       await HookController.emitter('init',[this.ctx,Utils])
    }
}