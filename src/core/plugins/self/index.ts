import {Plugin} from '../../index';
import {prompt} from './command';

interface config {
    lang: lang,
    projectType: projectType,
    frame: frame,
    env: env,
    ui:ui
}

export const basePlugin:Plugin<config> = (register,utils) => {
    const {useCommand} = utils;
    register<config>('init', async (ctx) => {
        const lang = await useCommand<{'lang':lang}>(prompt['lang'],'lang');
        const projectType = await useCommand<{'projectType':projectType}>(prompt['projectType'],'projectType');
        ctx.add('lang',lang);
        ctx.add('projectType',projectType);
    });
    register<config>('parse', async (cfg,ruleSetter)=>{
            ruleSetter<config, keyof config>(cfg.lang, async (val,utils)=>{
                if(val === 'javascript'){
                    
                }
            })
    })
}

export const framePlugin:Plugin<config> = (register,utils) => {
    const {useCommand} = utils;
    register<config>('init', async (ctx) => {
       const config = ctx.getConfig();
       switch(config.projectType){
           case "admin":
           case "component":
               const frame = await useCommand<{'frame':frame}>(prompt['frame'],'frame');
               ctx.add('frame', frame);
                break;
            case "utils":
                ctx.add('env','browser');
                break;
            case "server":
                ctx.add('env', 'node');
                break;
            default:
       }
    })
}

export const uiPlugin:Plugin<config> = (register,utils) => {
    const {useCommand} = utils;
    register<config>('init', async (ctx) => {
       const config = ctx.getConfig();
       switch(config.frame){
           case "react":{
            const uiFrame = await useCommand<{'ui':uiFrameForReact}>(prompt['uiForReact'],'ui');
           ctx.add('ui',uiFrame);
           break;}
           case "vue":{
            const uiFrame = await useCommand<{'ui':uiFrameForVue}>(prompt['uiForVue'],'ui');
            ctx.add('ui',uiFrame);
            break;}
            default:
       }
    })
}