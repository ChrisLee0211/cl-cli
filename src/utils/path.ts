import * as path from 'path';


export const getCurrentPath = ():string => {
    return process.cwd()
}

export const concatPath = (currentPath,name) => {
    return path.join(currentPath,name)
}

export const checkPathIsUseful = (path:string|undefined): path is string => {
    if(path === '' || !path) return false;
    return true
}

export const parseRootPath = (pathname:string) => {
    return path.parse(pathname).root
}