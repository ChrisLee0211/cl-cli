import program = require('commander')
import {ClCore} from '../src/core';
import {basePlugin,uiPlugin,framePlugin} from '../src/core/plugins/self'

// // 设置版本号和参数，通过 mycli --help 查看
// program.version('1.0.0')
//     .option('-t, --type <name>', 'project type')
//     .option('-n, --projectName <name>', 'project type')

// // 捕获命令和参数 eg： mycli create test -t vue
// program
//     .command('create <name>')
//     .action(function(name) {
//         // initProject(name)
//         const ins = new ClCore();
//         ins.use(basePlugin).use(framePlugin).use(uiPlugin);
//         ins.createCli(`testFile`);
//     })

// program.parse(process.argv)

const ins = new ClCore();
        ins.use(basePlugin).use(framePlugin).use(uiPlugin);
        ins.createCli(`testFile`);
