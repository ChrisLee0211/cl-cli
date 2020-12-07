"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ctx = void 0;
class Context {
    constructor() {
        this.config = {
            name: '',
            codeType: "typescript",
            projectType: "component",
            envType: 'browser',
            frameType: undefined,
            ui: 'none',
            useEslint: true,
            useAxios: true
        };
        this.progressStack = [];
    }
    setName(name) {
        this.config.name = name;
    }
    setProjectType(type) {
        this.config.projectType = type;
    }
    setCodeType(type) {
        this.config.codeType = type;
    }
    setEslint(state) {
        this.config.useEslint = state;
    }
    setAxios(state) {
        this.config.useAxios = state;
    }
    setFrame(frame) {
        this.config.frameType = frame;
    }
    setUI(ui) {
        this.config.ui = ui;
    }
    setEnv(env) {
        this.config.envType = env;
    }
    pushToStack(configName) {
        this.progressStack.push(configName);
    }
    isFinish() {
        const configNum = Object.keys(this.config).length;
        return this.progressStack.length === configNum;
    }
}
exports.default = new Context();
class Ctx {
    constructor(name, otherConfig) {
        this.config = { name: '' };
        this.config.name = name;
        this.extraConfig = otherConfig !== null && otherConfig !== void 0 ? otherConfig : {};
    }
    add(key, value) {
        if (key === 'name') {
            throw new Error(`Can not use prop "name" as config key`);
        }
        this.extraConfig[key] = value;
    }
    getConfig() {
        const result = Object.assign(Object.assign({}, this.config), this.extraConfig);
        return Object.freeze(result);
    }
}
exports.Ctx = Ctx;
//# sourceMappingURL=index.js.map