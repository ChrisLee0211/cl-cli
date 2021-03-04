#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const core_1 = require("../core");
const configLoader_1 = require("../core/configLoader");
const path_1 = require("../utils/path");
const file_1 = require("../utils/file");
// 设置版本号和参数，通过 mycli --help 查看
program.version("1.0.0");
// 捕获命令和参数 eg： mycli create test -t vue
program
    .command("create <name>")
    .option("-p --pluginConfig <name>", "plugin config")
    .action(function (name, cmd) {
    return __awaiter(this, void 0, void 0, function* () {
        let plugins = [];
        // 通过插件配置文件方式生成脚手架
        if (Object.keys(cmd).includes('pluginConfig')) {
            const pluginConfigPath = cmd.plugin;
            if (path_1.checkPathIsUseful(pluginConfigPath)) {
                try {
                    const fullPath = path_1.concatPath(path_1.getCurrentPath(), pluginConfigPath);
                    const isExist = yield file_1.checkFileIsBuilt(fullPath);
                    if (!isExist) {
                        throw new Error(`Can not find plugin conifg file by wrong path, please check if is correct`);
                    }
                    plugins = yield configLoader_1.configLoader(fullPath);
                }
                catch (e) {
                }
            }
            else {
                throw new Error(`Can not find plugin conifg file by wrong path, please check if is correct`);
            }
        }
        const ins = new core_1.ClCore();
        for (let i = 0; i < plugins.length; i++) {
            ins.use(plugins[i]);
        }
        yield ins.createCli(name);
        return;
    });
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map