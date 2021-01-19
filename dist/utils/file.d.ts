/// <reference types="node" />
import * as fs from 'fs';
/**
 * 判断一个文件是否已经在当前目录下存在
 * @param path 文件路径
 * @author chris lee
 * @Time 2020/11/23
 */
export declare function checkFileIsBuilt(path: string): Promise<boolean>;
/**
 * 在当前目录创建一个文件夹
 * @param name 文件名
 * @author chris lee
 * @Time 2021/01/14
 */
export declare function createFolder(name: string): Promise<string>;
/**
 * 异步读取文件内容
 * @param path 文件路径
 * @returns {Buffer}
 * @author chrislee
 * @Time 2021/01/14
 */
export declare function readFileContent(path: string): Promise<Buffer>;
/**
 * 扫描一个路径下的所有文件夹并返回一个文件夹名称数组
 * @param path 扫描路径
 * @returns {Array}
 * @author chris lee
 * @TIme 2020/01/14
 */
export declare function scanFolder(path: string): Promise<fs.Dirent[]>;
