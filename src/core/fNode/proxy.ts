import fileNodeCtr from "./main";
export default function proxyWrapper(fnode:fileNodeCtr) {
    const frozenProps: string[] = ["parent",
        "children",
        "content",
        "isFolder",
        "fileName",
        "rootPath",
        "path",
        "isChanged", ];
    const triggerKeys: string[] = ["appendChild", "destroy", "removeChild", "setContent", "setParent","setPath","setRootPath"];
    let enableEdit = false;
    const handler: ProxyHandler<typeof fnode> = {
        set(target, keyName, receiver) {
            if (!enableEdit) {
                return false;
            } else {
                return true;
            }
        },
        get(target, keyName, receiver) {
            if (typeof (keyName) === "string" && triggerKeys.includes(keyName)) {
                enableEdit = true;
                target["isChanged"] = true;
            }
            if (keyName === "freezeMethod") {
                enableEdit = false;
            }
            return Reflect.get(target, keyName, receiver);
        }
    };
    return new Proxy(fnode, handler);
}