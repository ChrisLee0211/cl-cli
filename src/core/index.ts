import {typeValidate} from "../utils/typeValidate";
import HookController, {HookCL} from "./helpers/HookController";
import {Ctx} from "./context";
import Utils from "./helpers/UtilsLib";
import {templateDownload} from "../utils/git";
import {checkFileIsBuilt, createFolder} from "../utils/file";
import {getCurrentPath, concatPath} from "../utils/path";
import CoreParser from "./parser";
import CoreComplier from "./complier";

type PluginFunction<T = any> = (registerFn:HookCL<T>["register"], utils: typeof Utils)=>void
export type Plugin<T = any> = PluginFunction<T>

function isPluginFn(fn): fn is PluginFunction {
    return typeValidate(fn, "function");
}

export class ClCore {
    pluginsQueue:Array<Plugin> = [];
    ctx:any;
    // eslint-disable-next-line no-undef
    barTimer:null|NodeJS.Timeout = null;
    OutPutPercent = 0;

    public use(plugin:Plugin){
        this.pluginsQueue.push(plugin);
        return this;
    }
    
    private installPlugins(){
        const cliUtils:typeof Utils = Utils; // prompt\gitDownload
        const registerFn = HookController.register;
        let len = this.pluginsQueue.length;
        while(len){
            const plugin = this.pluginsQueue.pop();
            if(isPluginFn(plugin)){
                // 插件内部只有注册钩子的能力，没有触发能力，触发由core控制
                plugin(registerFn, cliUtils);
            }
            len--;
            
        }
    }

    public async createCli(name) {
        this.installPlugins();
        const path = getCurrentPath();
        const projectName = await this.getProjectName(name);
        this.ctx = new Ctx(projectName);
        
        /** 触发init阶段，构造配置项ctx，随后根据配置项拉去基础模版 */
        await HookController.emitter("init", [this.ctx, Utils]);
        const projectPath = await createFolder(projectName);
        Utils.log("开始拉取模版", "warning");
        try{
            this.renderProgressBar();
            await templateDownload(this.ctx.template, projectPath);
            await this.destoryProgerssBar();
        }catch(e){
            console.error(e);
            Utils.log("拉取模版失败，请检查git地址配置是否正确", "danger");
            Utils.clearLog();
            this.barTimer && clearTimeout(this.barTimer)
            return;
        }
        Utils.log("拉取模版成功，开始编译额外配置", "success");
        const complier = new CoreComplier(projectName, projectPath);
        // 拉取成功后，应该开始将本地目录解析为fileTree
        await complier.complieLocalTemplate()

        /** 开始解析配置项，构造fileTree */
        await HookController.emitter("parse", [this.ctx, Utils, CoreParser.ruleSetter]);
        const parseFnTree = CoreParser.getParseFnTree();
        await complier.complierExtra(this.ctx,parseFnTree);

        /** 得到最终的fileTree，开始转化成文件项目目录，期间收集每个fileNode转化前的副作用函数 */
        await HookController.emitter("transform", [Utils, complier.setEffect]);
        Utils.log("开始生成项目目录......", "success");
        this.renderProgressBar();
        await complier.output();
        await this.destoryProgerssBar();
        Utils.log("正在初始化项目依赖......", "success");

        /** 项目构建完成，执行最后副作用，如允许额外指令等 */
        const fileTree = await complier.getFileTree();
        await HookController.emitter("finish", [fileTree, Utils]);
        Utils.log("项目搭建成功!", "success");
        return;
    }

    async getProjectName(name):Promise<string>{
        const path = getCurrentPath();
        const isBuild = await checkFileIsBuilt(concatPath(path, name));
        let projectName = name;
        if(isBuild){
            Utils.log("项目已在当前目录已存在，请重新命名", "warning");
            const renameCommand = {
                type:"input",
                message: "请输入项目名",
                name: "name",
                default: "my-project"
            };
            const answer = await  Utils.useCommand<{"name":string}>(renameCommand, "name");
            const exsited = await checkFileIsBuilt(concatPath(path, answer));
            if(exsited){
                projectName = this.getProjectName(answer);
            }else{
                projectName = answer;
            }
        }
        return projectName;
    }

    renderProgressBar(){
        this.barTimer = setTimeout(()=>{
            if(this.OutPutPercent<100){
                const random = Math.random();
                this.OutPutPercent += Number(random);
                Utils.progressBar("当前进度", this.OutPutPercent);
                this.renderProgressBar();
            }
        }, 1000);
    }

    destoryProgerssBar(){
        return new Promise<void>((rs,rj)=>{
            this.OutPutPercent = 100;
            Utils.progressBar("当前进度",this.OutPutPercent);
            setTimeout(() => {
                this.barTimer && clearTimeout(this.barTimer);
                Utils.clearLog()
                rs()
            },500)
        })
    }
}
