"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HookController {
    constructor() {
        this.initEvents = [];
        this.parseEvents = [];
        this.transformEvents = [];
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
            default:
                this.checkHookType(type);
        }
    }
    emitter(type, args) {
        let cb;
        let queue;
        switch (type) {
            case "init":
                queue = this.initEvents;
                break;
            case "parse":
                queue = this.parseEvents;
                break;
            case "transform":
                queue = this.transformEvents;
                break;
            default:
                this.checkHookType(type);
                queue = [];
        }
        while (queue.length) {
            cb = queue.pop();
            if (typeof (cb) === "function") {
                cb(...args);
            }
            else {
                throw new Error(`The lifeCylce callback expect a Function!`);
            }
        }
    }
    checkHookType(type) {
        if (!["init", "parse", "transform"].includes(type)) {
            throw new Error(`No such type like ${type}!`);
        }
        return type;
    }
}
exports.default = new HookController();
//# sourceMappingURL=HookController.js.map