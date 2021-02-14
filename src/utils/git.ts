import * as gitDownload from 'download-git-repo';

export const templateDownload = async (url:string,path:string):Promise<void>  => {
    return new Promise((resolve, reject) => {
            gitDownload(url,path,{clone:true},(err) => {
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        
    })
}