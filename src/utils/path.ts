import * as path from 'path';

export const getCurrentPath = ():string => {
    return process.cwd()
}

export const concatPath = (currentPath,name) => {
    return path.join(currentPath,name)
}