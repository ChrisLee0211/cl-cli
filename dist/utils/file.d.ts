/**
 * 判断一个文件是否已经在当前目录下存在
 * @param path 文件路径
 * @author chris lee
 * @Time 2020/11/23
 */
export declare function checkFileIsBuilt(path: string): Promise<boolean>;
export declare function createFolder(name: string): Promise<string>;
