import FileTree from "../fileTree";
import FileNode from "../fnode/main";
import { CoreParser } from "../parser";
interface CoreComplierInterface {
    fileTree: FileTree | undefined;
    /** 获取fileTree */
    getFileTree(): FileTree | undefined;
    /** 将本地拉取的模版目录编译成fileTree */
    complieLocalTemplate(): void;
    /** 将传入的fileList依次解析覆盖最新的fileTree */
    complierExtra(ctx: any, fileList: CoreParser["parseFnTree"]): void;
    /** 注册一个在output期间遍历fileTree时的需要执行副作用的回调函数 */
    setEffect(fn: outputCallback): void;
    /** 将fileTree生成为真实文件 */
    output(): void;
}
declare type outputCallback = (cur: FileNode) => Promise<void>;
export default class CoreComplier implements CoreComplierInterface {
    fileTree: FileTree | undefined;
    rootFileNode: FileNode | undefined;
    extraTree: FileNode | undefined;
    outputCbs: Array<outputCallback>;
    projectName: string;
    projectPath: string;
    constructor(name: string, path: string);
    /**
     * 返回一个只读的fileTree
     */
    getFileTree(): FileTree | undefined;
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
    complieLocalTemplate(): Promise<void>;
    /**
     * 解析parse阶段的树变为fileNode
     * @param list parse阶段解析出来的parseTree
     * @author chris lee
     * @Time 2021/02/14
     */
    complierExtra(ctx: any, list: CoreParser["parseFnTree"]): Promise<FileTree | undefined>;
    private isFileNode;
    /**
     * 注册副作用函数供编译outpuy时调用
     * @param fn 副作用函数
     * @author chris lee
     * @Time 2021/02/14
     */
    setEffect(fn: outputCallback): void;
    /**
     * 执行副作用函数
     * @param fnode 当前遍历的fnode
     * @param effects 副作用函数队列
     * @author chris lee
     * @Time 2021/02/14
     */
    private useEffect;
    output(): Promise<void>;
}
export {};
