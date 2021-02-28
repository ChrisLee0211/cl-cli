const prompt = {
    lang:{
        type: "list",
        message: "使用哪种语言进行开发",
        name: "lang",
        choices: ["typescript", "javascript"],
    },
    projectType:{
        type: "list",
        message: "创建那种类型项目",
        name: "projectType",
        choices: ["component", "admin", "utils", "server"],
    },
    frame:{
        type: "list",
        message: "使用哪种web框架",
        name: "frame",
        choices: ["react", "vue"],
    },
    env: {
        type: "list",
        message: "项目用于以下哪种运行环境",
        name: "env",
        choices: ["browser", "node"],
    },
    uiForVue: {
        type: "list",
        message: "使用以下何种UI框架",
        name: "ui",
        choices: ["antd-vue", "element", "none"],
    },
    uiForReact: {
        type: "list",
        message: "使用以下何种UI框架",
        name: "ui",
        choices: ["antd", "none"],
    }
};

export default {
    basePlugin:function(register, utils){
        const {useCommand} = utils;
        register("init", async (ctx) => {
            const lang = await useCommand(prompt["lang"], "lang");
            const projectType = await useCommand(prompt["projectType"], "projectType");
            ctx.add("lang", lang);
            ctx.add("projectType", projectType);
        });
        register("parse", async (cfg, utils, ruleSetter)=>{
            console.log(cfg);
        });
    },
    framePlugin:function(register, utils){
        const {useCommand} = utils;
        register("init", async (ctx) => {
            const config = ctx.getConfig();
            switch(config.projectType){
            case "admin":
            case "component":
                const frame = await useCommand(prompt["frame"], "frame");
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
    },
    uiPlugin:function(register, utils){
        const {useCommand} = utils;
        register("init", async (ctx) => {
            const config = ctx.getConfig();
            switch(config.frame){
            case "react":{
                const uiFrame = await useCommand(prompt["uiForReact"], "ui");
                ctx.add("ui", uiFrame);
                break; }
            case "vue":{
                const uiFrame = await useCommand(prompt["uiForVue"], "ui");
                ctx.add("ui", uiFrame);
                break; }
            default:
            }
        });
    }
}