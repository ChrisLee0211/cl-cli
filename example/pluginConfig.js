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

module.exports = {
    basePlugin:function(register, utils){
        const {useCommand} = utils;
        register("init", async (ctx) => {
            // const lang = await useCommand(prompt["lang"], "lang");
            // const projectType = await useCommand(prompt["projectType"], "projectType");
            // ctx.add("lang", lang);
            // ctx.add("projectType", projectType);
        });
        register("parse", async (cfg, ruleSetter)=>{
            ruleSetter( async(key,val,fileTree)=>{
                try{
                    const target = fileTree.children.find((fnode) => {return fnode.fileName === 'package.json'});
                    const packageJson = target
                    console.log('packageJson',packageJson)
                    if(packageJson){
                        const content = await packageJson.getContent();
                        const buf = new Buffer.from(JSON.parse(JSON.stringify(content)));
                        const data = buf.toString();
                        const obj = JSON.parse(data);
                        if(!obj['dependencies']){
                            obj['dependencies'] = {};
                        }
                        const dep = obj['dependencies'];
                        dep["koa"] = "^2.10.0";
                        dep["koa-bodyparser"] = "^3.2.0";
                        dep["koa-router"] = "^7.4.0";
                        obj["dependencies"] = dep;
                        const newContent = JSON.stringify(obj)
                        packageJson.setContent(newContent);
                        fileTree.removeChild(target);
                        fileTree.appendChild(packageJson)

                    }
                }catch(e){
                    console.error(e)
                }
                // if(key === 'projectType' && val === 'server'){
                //     try{
                //         const target = fileTree.children.find((fnode) => {fnode.fileName === 'package.json'});
                //         const packageJson = {...target};
                //         console.log('packageJson',packageJson)
                //         if(packageJson){
                //             const content = await packageJson.getContent();
                //             const json = JSON.stringify(content);
                //             const obj = JSON.parse(json);
                //             const dep = obj['dependencies'];
                //             dep["koa"] = "^2.10.0";
                //             dep["koa-bodyparser"] = "^3.2.0";
                //             dep["koa-router"] = "^7.4.0";
                //             obj["dependencies"] = dep;
                //             packageJson.setContent(JSON.stringify(obj));
                //             fileTree.removeChild(target);
                //             fileTree.appendChild(packageJson)

                //         }
                //     }catch(e){
                //         console.error(e)
                //     }
                // }
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
            const exec = require("child_process").exec;
            const cmdStr = `npm install`
            exec(cmdStr, (err, stdout, stderr) => {
                if (err){
                    console.error(err);
                } else {
                    console.log(stdout);
                }
            });
        })
    },
    // framePlugin:function(register, utils){
    //     const {useCommand} = utils;
    //     register("init", async (ctx) => {
    //         const config = ctx.getConfig();
    //         switch(config.projectType){
    //         case "admin":
    //         case "component":
    //             const frame = await useCommand(prompt["frame"], "frame");
    //             ctx.add("frame", frame);
    //             break;
    //         case "utils":
    //             ctx.add("env", "browser");
    //             break;
    //         case "server":
    //             ctx.add("env", "node");
    //             break;
    //         default:
    //         }
    //     });
    // },
    // uiPlugin:function(register, utils){
    //     const {useCommand} = utils;
    //     register("init", async (ctx) => {
    //         const config = ctx.getConfig();
    //         switch(config.frame){
    //         case "react":{
    //             const uiFrame = await useCommand(prompt["uiForReact"], "ui");
    //             ctx.add("ui", uiFrame);
    //             break; }
    //         case "vue":{
    //             const uiFrame = await useCommand(prompt["uiForVue"], "ui");
    //             ctx.add("ui", uiFrame);
    //             break; }
    //         default:
    //         }
    //     });
    // }
}