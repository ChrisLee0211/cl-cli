#!/usr/bin/env node

import program = require("commander")
import {ClCore,Plugin} from "../core";
import {configLoader} from "../core/configLoader";
import {checkPathIsUseful,concatPath,getCurrentPath} from '../utils/path';
import {checkFileIsBuilt} from '../utils/file'
import {basePlugin, uiPlugin, framePlugin} from "../core/plugins/self";

// 设置版本号和参数，通过 mycli --help 查看
program.version("1.0.0")

// 捕获命令和参数 eg： mycli create test -t vue
program
    .command("create <name>")
    .option("-p --pluginConfig <name>", "plugin config")
    .action(async function(name,cmd) {
        let plugins:Plugin[] = [];
        // 通过插件配置文件方式生成脚手架
        if(Object.keys(cmd).includes('pluginConfig')){
            const pluginConfigPath = cmd.plugin;
            if(checkPathIsUseful(pluginConfigPath)){
                try{
                    const fullPath = concatPath(getCurrentPath(),pluginConfigPath);
                    const isExist = await checkFileIsBuilt(fullPath);
                    if(!isExist){
                        throw new Error(`Can not find plugin conifg file by wrong path, please check if is correct`)
                    }
                    plugins = await configLoader(fullPath);
                }catch(e){
                    
                }
            }else{
                throw new Error(`Can not find plugin conifg file by wrong path, please check if is correct`)
            }
        }
        const ins = new ClCore();
        // ins.use(basePlugin).use(framePlugin).use(uiPlugin);
        for(let i=0;i<plugins.length;i++){
            ins.use(plugins[i])
        }
        await ins.createCli(name);
        return
    })
program.parse(process.argv);


