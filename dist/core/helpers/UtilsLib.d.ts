import * as inquirer from "inquirer";
import FileNode from "../fNode/main";
declare const _default: {
    useCommand: <T>(question: inquirer.Question<T>, property: string) => Promise<any>;
    log: (txt: string, infoType: "warning" | "success" | "danger") => void;
    progressBar: (desc: string, num: number, total?: number) => void;
    createFileNode: (name: string, path?: string | undefined, rootPath?: string | undefined, content?: any, isFolder?: boolean | undefined, parent?: FileNode | null) => FileNode;
};
export default _default;
