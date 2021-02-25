import { Plugin } from '../index';
/**
 *  解析pluginConfig为插件数组输出供外部注册
 * @param {string} configPath 文件地址
 * @author chris lee
 * @Time 2021/02/24
 */
export declare const configLoader: (configPath: string) => Promise<Plugin[]>;
