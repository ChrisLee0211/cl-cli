import {Plugin} from '../index';

/**
 *  解析pluginConfig为插件数组输出供外部注册
 * @param {string} configPath 文件地址
 * @author chris lee
 * @Time 2021/02/24
 */
export const configLoader = (configPath:string):Promise<Plugin[]> => {
    return new Promise((rs,rj) => {
        import(`${configPath}`).then((res:{[name:string]:Plugin}) => {
            const keys = Object.keys(res);
            const pluginList:Plugin[] = [];
            for(let i=0;i<keys.length;i++){
                pluginList.push(res[keys[i]])
            };
            rs(pluginList);
        },(err) => {
            rj(err)
        })
    })
}