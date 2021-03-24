import fileNode from '../fNode/main';
interface fileTree {
    /** 通过id查找fileNode */
    findById(id: string): fileNode | undefined;
    /** 通过文件名查找fileNode */
    findByName(name: string): fileNode[];
    /** 获取fileNode的根顶点 */
    getRoot(): fileNode;
}
export default class fileTreeCtr implements fileTree {
    tree: fileNode;
    constructor(root: fileNode);
    findById(id: string): fileNode | undefined;
    findByName(name: string): fileNode[];
    getRoot(): fileNode;
}
export {};
