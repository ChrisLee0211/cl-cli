import { fileNode } from "../helpers/UtilsLib";
interface CoreComplierInterface {
    fileTree: fileNode | undefined;
    /** 构建基础fileNode */
    /** 将本地拉取的模版目录编译成fileTree */
    complierLocalTemplate(path: any): void;
    /** 将传入的fileList依次插入到fileTree */
    complierExtra(fileList: fileNode[]): void;
    /** 将fileTree生成为真实文件 */
    output(): void;
}
export default class CoreComplier implements CoreComplierInterface {
    fileTree: fileNode | undefined;
    constructor(path: string);
    /**
     * 构建fileTree顶端节点
     * @param pathName 根文件入口路径
     * @author chris lee
     * @Time 2021/01/14
     */
    private createBaseFileNode;
    /**
     * 解析拉取下来的模版文件目录为fileTree
     * @param pathName 路径名
     * @author chrislee
     * @Time 2021/01/14
     */
    complierLocalTemplate(pathName: string): Promise<void>;
    complierExtra(list: any): void;
    output(): void;
}
export {};
