import program = require("commander")
import {ClCore,Plugin} from "../src/core";
import * as path from "path";
import * as fs from "fs";
import {configLoader} from "../src/core/configLoader";
import {checkPathIsUseful,concatPath,getCurrentPath} from '../src/utils/path';
import {checkFileIsBuilt} from '../src/utils/file'
import {basePlugin, uiPlugin, framePlugin} from "../src/core/plugins/self";

// 设置版本号和参数，通过 mycli --help 查看
program.version('1.0.0')
    .option('-t, --type <name>', 'project type')
    .option('-n, --projectName <name>', 'project type')
// 捕获命令和参数 eg： mycli create test -t vue
program
    .command('create <name>')
    .option("-p --pluginConfig <name>", "plugin config")
    .action(async function(name,cmd) {
        let plugins:Plugin[] = [];
        // 通过插件配置文件方式生成脚手架
        if(Object.keys(cmd).includes('pluginConfig')){
            const pluginConfigPath = cmd.pluginConfig;
            if(checkPathIsUseful(pluginConfigPath)){
                console.log('pluginConfigPath',pluginConfigPath)
                try{
                    const fullPath = concatPath(getCurrentPath(),pluginConfigPath);
                    const isExist = await checkFileIsBuilt(fullPath);
                    if(!isExist){
                        throw new Error(`Can not find plugin conifg file by wrong path, please check if is correct`)
                    }
                    plugins = await configLoader(fullPath);
                    console.log('plugins',plugins)
                }catch(e){
                    console.error(e)
                }
            }else{
                throw new Error(`Can not find plugin conifg file by wrong path, please check if is correct`)
            }
        }
        const ins = new ClCore();
        for(let i=0;i<plugins.length;i++){
            ins.use(plugins[i])
        }
        await ins.createCli(name);
        return
    })

program.parse(process.argv)

// const ins = new ClCore();
// const curPath = process.cwd();
// const folderPath = path.join(curPath, "pp");
// fs.readdir(folderPath, {withFileTypes:true}, (err, files) => {
//     if(!err){
//         const f = files;   
//         console.log("files", files);
//     }else{
//         console.error(err);
//     }
// });
// // ins.use(basePlugin).use(framePlugin).use(uiPlugin);
// ins.createCli("testFile");
