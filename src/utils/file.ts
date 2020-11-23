import * as fs from 'fs';

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
