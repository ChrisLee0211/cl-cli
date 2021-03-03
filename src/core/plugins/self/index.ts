import {Plugin} from "../../index";
import {prompt} from "./command";
import * as child_process from "child_process";
/** 语言类型 */
type lang = "typescript" | "javascript"
/** 项目类型 */
type projectType = "component" | "admin" | "utils" | "server"
/** 框架类型 */
type frame = "vue" | "react" 
/** 宿主类型 */
type env = "node" | "browser"
/** UI框架 */
type uiFrameForVue = "element" | "antd-vue" |"none"
type uiFrameForReact = "antd"| "none"
type ui = uiFrameForVue | uiFrameForReact | "none"
interface config {
    lang: lang,
    projectType: projectType,
    frame: frame,
    env: env,
    ui:ui
}

export const basePlugin:Plugin<config> = (register, utils) => {
    const {useCommand} = utils;
    register<config>("init", async (ctx) => {
        const lang = await useCommand<{"lang":lang}>(prompt["lang"], "lang");
        const projectType = await useCommand<{"projectType":projectType}>(prompt["projectType"], "projectType");
        ctx.add("lang", lang);
        ctx.add("projectType", projectType);
    });
    register<config>("parse", async (cfg, ruleSetter)=>{
        console.log(cfg);
        ruleSetter( async(key,val,fileTree)=>{
            if(key === 'projectType' && val === 'server'){
                try{
                    const packageJson = fileTree.children.find((fnode) => {fnode.fileName === 'package.json'});
                    if(packageJson){
                        const content = await packageJson.getContent();
                        const json = JSON.stringify(content);
                        const obj = JSON.parse(json);
                        const dep = obj['dependencies'];
                        dep["koa"] = "^2.10.0";
                        dep["koa-bodyparser"] = "^3.2.0";
                        dep["koa-router"] = "^7.4.0";
                        obj["dependencies"] = dep;
                        packageJson.setContent(JSON.stringify(obj))
                    }
                }catch(e){
                    console.error(e)
                }
            }
            return fileTree
        })
    });
    register("transform",(setEffect)=>{
        setEffect( async (fileNode) => {
            if(fileNode.fileName === '.vscode'){
                fileNode.destroy()
            }
        })
    })
    register("finish",(fileTree) => {
        const exec = child_process.exec;
        const cmdStr = `npm install`
        exec(cmdStr, (err, stdout, stderr) => {
            if (err){
                console.error(err);
            } else {
                console.log(stdout);
            }
        });
    })
};

export const framePlugin:Plugin<config> = (register, utils) => {
    const {useCommand} = utils;
    register<config>("init", async (ctx) => {
        const config = ctx.getConfig();
        switch(config.projectType){
        case "admin":
        case "component":
            const frame = await useCommand<{"frame":frame}>(prompt["frame"], "frame");
            ctx.add("frame", frame);
            break;
        case "utils":
            ctx.add("env", "browser");
            break;
        case "server":
            ctx.add("env", "node");
            break;
        default:
        }
    });
};

export const uiPlugin:Plugin<config> = (register, utils) => {
    const {useCommand} = utils;
    register<config>("init", async (ctx) => {
        const config = ctx.getConfig();
        switch(config.frame){
        case "react":{
            const uiFrame = await useCommand<{"ui":uiFrameForReact}>(prompt["uiForReact"], "ui");
            ctx.add("ui", uiFrame);
            break; }
        case "vue":{
            const uiFrame = await useCommand<{"ui":uiFrameForVue}>(prompt["uiForVue"], "ui");
            ctx.add("ui", uiFrame);
            break; }
        default:
        }
    });
};