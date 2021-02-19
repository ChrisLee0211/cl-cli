/** 文件节点内容 */
export interface fileNodeContent {
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
    /** 是否被改变过 */
    isChanged: boolean;
    /** 添加一个fileNode到children中 */
    appendChild(fileNode: fileNodeContent): fileNodeContent;
    /** 销毁本身 */
    destroy(): void;
    /** 销毁指定子节点 */
    removeChild(fnode: fileNodeContent): void;
    /** 设置文件内容 */
    setContent(newContent: any): boolean;
}
export default class fileNode implements fileNodeContent {
    parent: fileNode | null;
    children: fileNode[];
    content: any;
    isFolder: boolean;
    fileName: string;
    rootPath: string;
    path: string;
    isChanged: boolean;
    constructor(name: string, path?: string, rootPath?: string, content?: any, isFolder?: boolean, parent?: fileNode | null);
    appendChild(fnode: fileNode): this;
    destroy(): void;
    removeChild(fnode: fileNode): void;
    setContent(newContent: any): boolean;
    setParent(fnode: fileNode): void;
    /**
     * 对path、rootPath、parent属性进行校验与格式化
     * @param fnode
     * @return {fileNode}
     * @author chris lee
     * @Time 2021/02/06
     */
    private normalizeChildFileNode;
    /**
     * 判断是否为fileNode
     * @param target
     * @author chris lee
     * @Time 2021/02/06
     */
    private isFileNode;
    private freezeMethod;
}
