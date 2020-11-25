"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prompt = void 0;
exports.prompt = {
    rename: {
        type: "input",
        message: '请输入项目名',
        name: 'name',
        default: 'my-project'
    },
    lang: {
        type: 'list',
        message: '使用哪种语言进行开发',
        name: 'lang',
        choices: ['typescript', 'javascript'],
    },
    projectType: {
        type: 'list',
        message: '创建那种类型项目',
        name: 'projectType',
        choices: ['component', 'admin', 'utils', 'server'],
    },
    frame: {
        type: 'list',
        message: '使用哪种web框架',
        name: 'frame',
        choices: ['react', 'vue'],
    },
    env: {
        type: 'list',
        message: '项目用于以下哪种运行环境',
        name: 'env',
        choices: ['browser', 'node'],
    }
};
//# sourceMappingURL=prompt.js.map