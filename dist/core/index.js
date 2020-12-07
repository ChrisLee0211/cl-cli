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
            this.ctx = new context_1.Ctx(projectName);
            HookController_1.default.emitter('init', [this.ctx, UtilsLib_1.default]);
        });
    }
}
exports.ClCore = ClCore;
//# sourceMappingURL=index.js.map