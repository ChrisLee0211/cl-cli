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
const file_1 = require("../utils/file");
const path_1 = require("../utils/path");
const parser_1 = require("./parser");
const complier_1 = require("./complier");
function isPluginFn(fn) {
    return typeValidate_1.typeValidate(fn, 'function');
}
class ClCore {
    constructor() {
        this.pluginsQueue = [];
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
            ;
            len--;
        }
    }
    createCli(name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.installPlugins();
            const path = path_1.getCurrentPath();
            const isBuild = yield file_1.checkFileIsBuilt(path_1.concatPath(path, name));
            let projectName = name;
            // if(isBuild){
            //     Utils.log(`项目已在当前目录已存在，请重新命名`,'warning');
            //     const renameCommand = {
            //         type:"input",
            //         message: '请输入项目名',
            //         name: 'name',
            //         default: 'my-project'
            //     }
            //     const answer = await  Utils.useCommand<{'name':string}>(renameCommand,'name');
            //     projectName = answer;
            // }
            this.ctx = new context_1.Ctx(projectName);
            yield HookController_1.default.emitter('init', [this.ctx, UtilsLib_1.default]);
            const projectPath = yield file_1.createFolder(projectName);
            UtilsLib_1.default.log(`开始拉取模版`, 'warning');
            //    try{
            //        await Utils.templateDownload(this.ctx.template,projectPath);
            //    }catch(e){
            //        console.error(e)
            //    }
            UtilsLib_1.default.log(`拉取模版成功，开始编译额外配置`, 'success');
            const complier = new complier_1.default(projectPath);
            // 拉取成功后，应该开始将本地目录解析为fileTree
            // -------
            yield HookController_1.default.emitter('parse', [this.ctx, UtilsLib_1.default, parser_1.default.ruleSetter]);
        });
    }
}
exports.ClCore = ClCore;
//# sourceMappingURL=index.js.map