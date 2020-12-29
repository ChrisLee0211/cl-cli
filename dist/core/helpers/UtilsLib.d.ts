import * as inquirer from 'inquirer';
/** 文件节点 */
export interface fileNode {
    /** 文件路径 */
    path: string;
    /** 根路径 */
    rootPath: string;
    /** 文件名称 */
    fileName: string;
    /** 是否文件夹 */
    isFolder: boolean;
    /** 文件内容 string或buffer */
    content: any;
    /** 父级目录 */
    parent: fileNode | null;
    /** 子级目录包含的文件节点 */
    children: fileNode[];
}
declare const _default: {
    useCommand: <T>(question: inquirer.Question<T>, property: string) => Promise<any>;
    log: (txt: string, infoType: "warning" | "success" | "danger") => void;
    templateDownload: (url: string, path: string) => Promise<void>;
    createFileNode: (name: string, path?: string | undefined, rootPath?: string | undefined, content?: any, isFolder?: boolean | undefined) => fileNode;
};
export default _default;
