import program = require("commander")
import {ClCore} from "../src/core";
import * as path from "path";
import * as fs from "fs";
import {basePlugin, uiPlugin, framePlugin} from "../src/core/plugins/self";

// // 设置版本号和参数，通过 mycli --help 查看
program.version('1.0.0')
    .option('-t, --type <name>', 'project type')
    .option('-n, --projectName <name>', 'project type')
// 捕获命令和参数 eg： mycli create test -t vue
program
    .command('create <name>')
    .option("-p --pluginConfig <name>", "plugin config")
    .action(function(name,command) {
        // initProject(name)
        console.log('project name',name);
        console.log('plugin config',command)
        // const ins = new ClCore();
        // ins.use(basePlugin).use(framePlugin).use(uiPlugin);
        // ins.createCli(`testFile`);
    })

program.parse(process.argv)

const ins = new ClCore();
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
ins.use(basePlugin).use(framePlugin).use(uiPlugin);
ins.createCli("testFile");
