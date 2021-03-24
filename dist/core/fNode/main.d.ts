/** 文件节点内容 */
export interface fileNodeContent {
    /** id标识 */
    id: string;
    /** 文件路径 */
    path: string;
    /** 根路径 */
    rootPath: string;
    /** 文件名称 */
    fileName: string;
    /** 是否文件夹 */
    isFolder: boolean;
    /** 文件内容 string或buffer */
    /** 父级目录 */
    parent: fileNode | null;
    /** 子级目录包含的文件节点 */
    children: fileNode[];
    /** 是否被改变过 */
    isChanged: boolean;
    /** 获取文件内容 */
    getContent(): Promise<any>;
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
    id: string;
    parent: fileNode | null;
    children: fileNode[];
    private content;
    isFolder: boolean;
    fileName: string;
    rootPath: string;
    path: string;
    isChanged: any;
    constructor(name: string, path?: string, rootPath?: string, content?: any, isFolder?: boolean, parent?: fileNode | null);
    getContent(): Promise<any>;
    appendChild(fnode: fileNode): this;
    destroy(): void;
    removeChild(fnode: fileNode): void;
    setContent(newContent: any): boolean;
    setParent(fnode: fileNode | null): void;
    setPath(path: string): void;
    setRootPath(rPath: string): void;
    /**
     * 判断是否为fileNode
     * @param target
     * @author chris lee
     * @Time 2021/02/06
     */
    private isFileNode;
    private freezeMethod;
}
