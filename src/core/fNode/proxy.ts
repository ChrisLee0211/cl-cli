import fileNodeCtr from "./main";
import HookCtr from "../helpers/HookController";

export default function proxyWrapper(fnode:fileNodeCtr) {
    const frozenProps: string[] = ["parent",
        "children",
        "content",
        "isFolder",
        "fileName",
        "rootPath",
        "path",
        "isChanged", ];
    const triggerKeys: string[] = ["getContent","appendChild", "destroy", "removeChild", "setContent", "setParent","setPath","setRootPath"];
    let enableEdit = false;
    let curStep = HookCtr.currentStep;
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
                //
                //
                //
                //
                // curStep有问题，esmodule方式因为是静态，拿的并不是全局的钩子状态，需要转用node的全局变量做这个才行




                if(curStep !== "init"){
                    target["isChanged"] = true;
                }
                return target[keyName].bind(target)
            }
            if (keyName === "freezeMethod") {
                enableEdit = false;
            }
            return Reflect.get(target, keyName, receiver);
        }
    };
    return new Proxy(fnode, handler);
}