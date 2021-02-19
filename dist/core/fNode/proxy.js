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
    const triggerKeys = ["appendChild", "destroy", "removeChild", "setContent"];
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