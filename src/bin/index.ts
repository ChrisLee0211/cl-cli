#!/usr/bin/env node

import program = require("commander")
import {ClCore} from "../core";
import {basePlugin, uiPlugin, framePlugin} from "../core/plugins/self";

// 设置版本号和参数，通过 mycli --help 查看
program.version("1.0.0")

// 捕获命令和参数 eg： mycli create test -t vue
program
    .command("create <name>")
    .option("-p --pluginConfig <name>", "plugin config")
    .action(function(name,cmd) {
        // 通过插件配置文件方式生成脚手架
        if(Object.keys(cmd).includes('pluginConfig')){
            const pluhinConfigPath = cmd.plugin;
            // 通过读取文件执行ins.use
        }
        const ins = new ClCore();
        ins.use(basePlugin).use(framePlugin).use(uiPlugin);
        ins.createCli(name);
    });

program.parse(process.argv);
