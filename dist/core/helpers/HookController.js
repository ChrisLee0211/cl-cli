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
class HookController {
    constructor() {
        this.initEvents = [];
        this.parseEvents = [];
        this.transformEvents = [];
        this.finishEvents = [];
        this.currentStep = "init";
        this.register = this.register.bind(this);
        this.emitter = this.emitter.bind(this);
    }
    register(type, fn) {
        switch (type) {
            case "init":
                this.initEvents.push(fn);
                break;
            case "parse":
                this.parseEvents.push(fn);
                break;
            case "transform":
                this.transformEvents.push(fn);
                break;
            case "finish":
                this.finishEvents.push(fn);
                break;
            default:
                this.checkHookType(type);
        }
    }
    emitter(type, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let cb;
            let queue;
            switch (type) {
                case "init":
                    queue = this.initEvents;
                    this.currentStep = "init";
                    break;
                case "parse":
                    queue = this.parseEvents;
                    this.currentStep = "parse";
                    break;
                case "transform":
                    queue = this.transformEvents;
                    this.currentStep = "transform";
                    break;
                case "finish":
                    queue = this.finishEvents;
                    this.currentStep = "finish";
                    break;
                default:
                    this.checkHookType(type);
                    queue = [];
            }
            while (queue.length) {
                cb = queue.pop();
                if (typeof (cb) === "function") {
                    yield cb(...args);
                }
                else {
                    throw new Error("The lifeCylce callback expect a Function!");
                }
            }
        });
    }
    checkHookType(type) {
        if (!["init", "parse", "transform", "finish"].includes(type)) {
            throw new Error(`No such type like ${type}!`);
        }
        return type;
    }
}
exports.default = new HookController();
//# sourceMappingURL=HookController.js.map