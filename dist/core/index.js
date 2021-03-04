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
exports.ClCore = void 0;
const typeValidate_1 = require("../utils/typeValidate");
const HookController_1 = require("./helpers/HookController");
const context_1 = require("./context");
const UtilsLib_1 = require("./helpers/UtilsLib");
const git_1 = require("../utils/git");
const file_1 = require("../utils/file");
const path_1 = require("../utils/path");
const parser_1 = require("./parser");
const complier_1 = require("./complier");
function isPluginFn(fn) {
    return typeValidate_1.typeValidate(fn, "function");
}
class ClCore {
    constructor() {
        this.pluginsQueue = [];
        // eslint-disable-next-line no-undef
        this.barTimer = null;
        this.OutPutPercent = 0;
    }
    use(plugin) {
        this.pluginsQueue.push(plugin);
        return this;
    }
    installPlugins() {
        const cliUtils = UtilsLib_1.default; // prompt\gitDownload
        const registerFn = HookController_1.default.register;
        let len = this.pluginsQueue.length;
        while (len) {
            const plugin = this.pluginsQueue.pop();
            if (isPluginFn(plugin)) {
                // 插件内部只有注册钩子的能力，没有触发能力，触发由core控制
                plugin(registerFn, cliUtils);
            }
            len--;
        }
    }
    createCli(name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.installPlugins();
            const path = path_1.getCurrentPath();
            const projectName = yield this.getProjectName(name);
            this.ctx = new context_1.Ctx(projectName);
            /** 触发init阶段，构造配置项ctx，随后根据配置项拉去基础模版 */
            yield HookController_1.default.emitter("init", [this.ctx]);
            const projectPath = yield file_1.createFolder(projectName);
            UtilsLib_1.default.log("开始拉取模版", "warning");
            try {
                this.renderProgressBar();
                yield git_1.templateDownload(this.ctx.template, projectPath);
                yield this.destoryProgerssBar();
            }
            catch (e) {
                console.error(e);
                UtilsLib_1.default.log("拉取模版失败，请检查git地址配置是否正确", "danger");
                UtilsLib_1.default.clearLog();
                this.barTimer && clearTimeout(this.barTimer);
                return;
            }
            UtilsLib_1.default.log("拉取模版成功，开始编译额外配置", "success");
            const complier = new complier_1.default(projectName, projectPath);
            // 拉取成功后，应该开始将本地目录解析为fileTree
            yield complier.complieLocalTemplate();
            /** 开始解析配置项，构造fileTree */
            yield HookController_1.default.emitter("parse", [this.ctx, parser_1.default.ruleSetter]);
            const parseFnTree = parser_1.default.getParseFnTree();
            yield complier.complierExtra(this.ctx, parseFnTree);
            /** 得到最终的fileTree，开始转化成文件项目目录，期间收集每个fileNode转化前的副作用函数 */
            yield HookController_1.default.emitter("transform", [complier.setEffect]);
            UtilsLib_1.default.log("开始生成项目目录......", "success");
            this.renderProgressBar();
            yield complier.output();
            yield this.destoryProgerssBar();
            UtilsLib_1.default.log("正在初始化项目依赖......", "success");
            /** 项目构建完成，执行最后副作用，如允许额外指令等 */
            const fileTree = yield complier.getFileTree();
            yield HookController_1.default.emitter("finish", [fileTree]);
            UtilsLib_1.default.log("项目搭建成功!", "success");
            return;
        });
    }
    /**
     * 获取项目名称，重复则继续调用自身
     * @param name 项目名称
     * @author chris lee
     * @Time 2021/02/28
     */
    getProjectName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = path_1.getCurrentPath();
            const isBuild = yield file_1.checkFileIsBuilt(path_1.concatPath(path, name));
            let projectName = name;
            if (isBuild) {
                UtilsLib_1.default.log("项目已在当前目录已存在，请重新命名", "warning");
                const renameCommand = {
                    type: "input",
                    message: "请输入项目名",
                    name: "name",
                    default: "my-project"
                };
                const answer = yield UtilsLib_1.default.useCommand(renameCommand, "name");
                const exsited = yield file_1.checkFileIsBuilt(path_1.concatPath(path, answer));
                if (exsited) {
                    projectName = this.getProjectName(answer);
                }
                else {
                    projectName = answer;
                }
            }
            return projectName;
        });
    }
    /**
     *  渲染进度条
     * @author chris lee
     * @Time 2021/02/28
     */
    renderProgressBar() {
        this.barTimer = setTimeout(() => {
            if (this.OutPutPercent < 100) {
                const random = Math.random();
                this.OutPutPercent += Number(random);
                UtilsLib_1.default.progressBar("当前进度", this.OutPutPercent);
                this.renderProgressBar();
            }
        }, 1000);
    }
    /**
     *  销毁进度条
     * @author chris lee
     * @Time 2021/02/28
     */
    destoryProgerssBar() {
        return new Promise((rs, rj) => {
            this.OutPutPercent = 100;
            UtilsLib_1.default.progressBar("当前进度", this.OutPutPercent);
            setTimeout(() => {
                this.barTimer && clearTimeout(this.barTimer);
                UtilsLib_1.default.clearLog();
                rs();
            }, 500);
        });
    }
}
exports.ClCore = ClCore;
//# sourceMappingURL=index.js.map