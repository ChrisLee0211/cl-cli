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
exports.uiPlugin = exports.framePlugin = exports.basePlugin = void 0;
const command_1 = require("./command");
const child_process = require("child_process");
exports.basePlugin = (register, utils) => {
    const { useCommand } = utils;
    register("init", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const lang = yield useCommand(command_1.prompt["lang"], "lang");
        const projectType = yield useCommand(command_1.prompt["projectType"], "projectType");
        ctx.add("lang", lang);
        ctx.add("projectType", projectType);
    }));
    register("parse", (cfg, ruleSetter) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(cfg);
        ruleSetter((key, val, fileTree) => __awaiter(void 0, void 0, void 0, function* () {
            if (key === 'projectType' && val === 'server') {
                try {
                    const packageJson = fileTree.children.find((fnode) => { fnode.fileName === 'package.json'; });
                    if (packageJson) {
                        const content = yield packageJson.getContent();
                        const json = JSON.stringify(content);
                        const obj = JSON.parse(json);
                        const dep = obj['dependencies'];
                        dep["koa"] = "^2.10.0";
                        dep["koa-bodyparser"] = "^3.2.0";
                        dep["koa-router"] = "^7.4.0";
                        obj["dependencies"] = dep;
                        packageJson.setContent(JSON.stringify(obj));
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
            return fileTree;
        }));
    }));
    register("transform", (setEffect) => {
        setEffect((fileNode) => __awaiter(void 0, void 0, void 0, function* () {
            if (fileNode.fileName === '.vscode') {
                fileNode.destroy();
            }
        }));
    });
    register("finish", (fileTree) => {
        const exec = child_process.exec;
        const cmdStr = `npm install`;
        exec(cmdStr, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log(stdout);
            }
        });
    });
};
exports.framePlugin = (register, utils) => {
    const { useCommand } = utils;
    register("init", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const config = ctx.getConfig();
        switch (config.projectType) {
            case "admin":
            case "component":
                const frame = yield useCommand(command_1.prompt["frame"], "frame");
                ctx.add("frame", frame);
                break;
            case "utils":
                ctx.add("env", "browser");
                break;
            case "server":
                ctx.add("env", "node");
                break;
            default:
        }
    }));
};
exports.uiPlugin = (register, utils) => {
    const { useCommand } = utils;
    register("init", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const config = ctx.getConfig();
        switch (config.frame) {
            case "react": {
                const uiFrame = yield useCommand(command_1.prompt["uiForReact"], "ui");
                ctx.add("ui", uiFrame);
                break;
            }
            case "vue": {
                const uiFrame = yield useCommand(command_1.prompt["uiForVue"], "ui");
                ctx.add("ui", uiFrame);
                break;
            }
            default:
        }
    }));
};
//# sourceMappingURL=index.js.map