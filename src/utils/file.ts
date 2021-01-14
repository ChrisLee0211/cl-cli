import * as fs from 'fs';
import * as path from 'path';
/**
 * 判断一个文件是否已经在当前目录下存在
 * @param path 文件路径
 * @author chris lee
 * @Time 2020/11/23
 */
export function checkFileIsBuilt(path:string):Promise<boolean>{
    return new Promise((resolve,reject) => {
        try{
            fs.access(path,fs.constants.F_OK,(err)=>{
                if(!err){
                    resolve(true)
                }else{
                    resolve(false)
                }
            })
        }catch(e){
            console.error(e);
            reject(e)
        }
    })
}

/**
 * 在当前目录创建一个文件夹
 * @param name 文件名
 * @author chris lee
 * @Time 2021/01/14
 */
export async function createFolder(name:string):Promise<string>{
    const curPath = process.cwd();
    const folderPath = path.join(curPath,name)
    return new Promise((resolve, reject) => {
        try{
            fs.mkdir(folderPath,{recursive:true},(err) => {
                if(!err){
                    resolve(folderPath)
                }
            })
        }catch(e){
            reject(e);
            console.error(e)
        }
    })
}

/**
 * 异步读取文件内容
 * @param path 文件路径
 * @returns {Buffer}
 * @author chrislee
 * @Time 2021/01/14
 */
export async function readFileContent(path:string):Promise<Buffer> {
    return new Promise((resolve,reject) => {
        try{
            fs.readFile(path,(err,data) => {
                if(!err){
                    resolve(data)
                }
            })
        }catch(e){
            reject(e);
            console.error(e)
        }
    })
}