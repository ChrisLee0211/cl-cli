"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                if (global.currentStep !== "init") {
                    target["isChanged"] = true;
                }
                return target[keyName].bind(target);
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