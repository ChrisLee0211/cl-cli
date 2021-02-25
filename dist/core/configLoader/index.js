"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configLoader = void 0;
/**
 *  解析pluginConfig为插件数组输出供外部注册
 * @param {string} configPath 文件地址
 * @author chris lee
 * @Time 2021/02/24
 */
exports.configLoader = (configPath) => {
    return new Promise((rs, rj) => {
        Promise.resolve().then(() => require(`${configPath}`)).then((res) => {
            const keys = Object.keys(res);
            const pluginList = [];
            for (let i = 0; i < keys.length; i++) {
                pluginList.push(res[keys[i]]);
            }
            ;
            rs(pluginList);
        }, (err) => {
            rj(err);
        });
    });
};
//# sourceMappingURL=index.js.map