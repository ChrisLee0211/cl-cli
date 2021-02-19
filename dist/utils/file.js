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
exports.createFile = exports.removeFile = exports.scanFolder = exports.readFileContent = exports.createFolder = exports.checkFileIsBuilt = void 0;
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
/**
 * 在当前目录创建一个文件夹
 * @param name 文件名
 * @author chris lee
 * @Time 2021/01/14
 */
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
/**
 * 异步读取文件内容
 * @param path 文件路径
 * @returns {Buffer}
 * @author chrislee
 * @Time 2021/01/14
 */
function readFileContent(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(path, (err, data) => {
                    if (!err) {
                        resolve(data);
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
exports.readFileContent = readFileContent;
/**
 * 扫描一个路径下的所有文件夹并返回一个文件夹名称数组
 * @param path 扫描路径
 * @returns {Array}
 * @author chris lee
 * @TIme 2020/01/14
 */
function scanFolder(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                fs.readdir(path, { withFileTypes: true }, (err, files) => {
                    if (!err) {
                        resolve(files);
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
exports.scanFolder = scanFolder;
/**
 * 删除指定文件
 * @param {string} path 文件名(包含路径)
 * @returns {boolean}
 * @author chris lee
 * @Time 2021/01/28
 */
function removeFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                fs.unlink(path, (err) => {
                    if (!err) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
    });
}
exports.removeFile = removeFile;
/**
 * 在指定目录下创建文件
 * @param {string} path 路径
 * @param {string} fileName 文件名
 * @param {any} content 内容
 * @author chris lee
 * @Time 2021/02/12
 */
function createFile(filePath, fileName, content) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                fs.writeFile(path.join(filePath, fileName), content, (err) => {
                    if (!err) {
                        resolve();
                    }
                    else {
                        reject(err);
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
    });
}
exports.createFile = createFile;
//# sourceMappingURL=file.js.map