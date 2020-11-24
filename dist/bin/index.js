#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const index_1 = require("../core/init/index");
// 设置版本号和参数，通过 mycli --help 查看
program.version('1.0.0')
    .option('-t, --type <name>', 'project type')
    .option('-n, --projectName <name>', 'project type');
// 捕获命令和参数 eg： mycli create test -t vue
program
    .command('create <name>')
    .action(function (name) {
    index_1.initProject(name);
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map