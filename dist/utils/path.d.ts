export declare const getCurrentPath: () => string;
/**
 * 拼接文件到当前路径
 * @param currentPath 当前路径
 * @param name 文件名
 * @returns {string}
 * @author chris lee
 * @Time 2021/02/08
 */
export declare const concatPath: (currentPath: any, name: any) => string;
/**
 * 校验路径是否可用
 * @param path 路径
 * @returns {boolean}
 * @author chris lee
 * @Time 2021/02/08
 */
export declare const checkPathIsUseful: (path: string | undefined) => path is string;
/**
 * 获取当前路径的根路径
 * @param pathname 路径
 * @returns {boolean}
 * @author chris lee
 * @Time 2021/02/08
 */
export declare const parseRootPath: (pathname: string) => string;
