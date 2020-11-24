"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileIsBuilt = void 0;
const fs = require("fs");
/**
 * 判断一个文件是否已经在当前目录下存在
 * @param path 文件路径
 * @author chris lee
 * @Time 2020/11/23
 */
function checkFileIsBuilt(path) {
    return new Promise((resolve, reject) => {
        try {
            fs.access(path, fs.constants.F_OK, (err) => {
                if (!err) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    });
}
exports.checkFileIsBuilt = checkFileIsBuilt;
//# sourceMappingURL=file.js.map