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
    }
};
//# sourceMappingURL=prompt.js.map