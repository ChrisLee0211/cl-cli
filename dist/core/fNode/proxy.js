"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HookController_1 = require("../helpers/HookController");
function proxyWrapper(fnode) {
    const frozenProps = ["parent",
        "children",
        "content",
        "isFolder",
        "fileName",
        "rootPath",
        "path",
        "isChanged",];
    const triggerKeys = ["getContent", "appendChild", "destroy", "removeChild", "setContent", "setParent", "setPath", "setRootPath"];
    let enableEdit = false;
    let curStep = HookController_1.default.currentStep;
    const handler = {
        set(target, keyName, receiver) {
            if (!enableEdit) {
                return false;
            }
            else {
                return true;
            }
        },
        get(target, keyName, receiver) {
            if (typeof (keyName) === "string" && triggerKeys.includes(keyName)) {
                enableEdit = true;
                if (curStep !== "init") {
                    target["isChanged"] = true;
                }
            }
            if (keyName === "freezeMethod") {
                enableEdit = false;
            }
            return Reflect.get(target, keyName, receiver);
        }
    };
    return new Proxy(fnode, handler);
}
exports.default = proxyWrapper;
//# sourceMappingURL=proxy.js.map