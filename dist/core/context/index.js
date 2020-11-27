"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=index.js.map