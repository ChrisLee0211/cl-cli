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
exports.initProject = void 0;
const inquirer = require("inquirer");
const log_1 = require("../../utils/log");
const file_1 = require("../../utils/file");
const path_1 = require("../../utils/path");
const prompt_1 = require("../commanders/prompt");
const context_1 = require("../context");
/**
 * 初始化项目信息
 * @param name 项目名称
 * @author chris lee
 * @Time 2020/11/20
 */
exports.initProject = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const path = path_1.getCurrentPath();
    const isBuild = yield file_1.checkFileIsBuilt(path_1.concatPath(path, name));
    let projectName = name;
    if (isBuild) {
        log_1.log(`项目已在当前目录已存在，请重新命名`, 'warning');
        const answer = yield inquirer.prompt([prompt_1.prompt["rename"]]);
        projectName = answer.name;
    }
    context_1.default.setName(projectName);
    const langChoice = yield inquirer.prompt([prompt_1.prompt['lang']]);
    context_1.default.setCodeType(langChoice.lang);
    const projectType = yield inquirer.prompt([prompt_1.prompt['projectType']]);
    context_1.default.setProjectType(projectType.projectType);
    switch (projectType.projectType) {
        case "admin":
        case "component":
            const frame = yield inquirer.prompt([prompt_1.prompt['frame']]);
            if (frame.frame === 'vue') {
                const UiFrame = yield inquirer.prompt(prompt_1.prompt['uiForVue']);
                context_1.default.setUI(UiFrame.ui);
            }
            if (frame.frame === 'react') {
                const UiFrame = yield inquirer.prompt(prompt_1.prompt['uiForReact']);
                context_1.default.setUI(UiFrame.ui);
            }
            context_1.default.setFrame(frame.frame);
            context_1.default.setEnv('browser');
            break;
        case "utils":
            context_1.default.setEnv('browser');
            break;
        case "server":
            context_1.default.setEnv('node');
            break;
        default:
    }
    console.log(context_1.default.progressStack);
});
//# sourceMappingURL=index.js.map