import { fileNode } from "../helpers/UtilsLib";
interface CoreComplierInterface {
    fileTree: fileNode | undefined;
    /** 创建fileNode */
    /** 将本地拉取的模版目录编译成fileTree */
    complierLocalTemplate(path: string): void;
    /** 将传入的fileList依次插入到fileTree */
    complierExtra(fileList: fileNode[]): void;
    /** 将fileTree生成为真实文件 */
    output(): void;
}
export default class CoreComplier implements CoreComplierInterface {
    fileTree: any;
    constructor(path: string);
    complierLocalTemplate(path: string): void;
    complierExtra(list: any): void;
    output(): void;
}
export {};
