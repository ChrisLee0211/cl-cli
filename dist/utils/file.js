"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolder = exports.checkFileIsBuilt = void 0;
const fs = require("fs");
const path = require("path");
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
function createFolder(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const curPath = process.cwd();
        const folderPath = path.join(curPath, name);
        return new Promise((resolve, reject) => {
            try {
                fs.mkdir(folderPath, { recursive: true }, (err) => {
                    if (!err) {
                        resolve(folderPath);
                    }
                });
            }
            catch (e) {
                reject(e);
                console.error(e);
            }
        });
    });
}
exports.createFolder = createFolder;
//# sourceMappingURL=file.js.map