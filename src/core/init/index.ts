import * as inquirer from 'inquirer';
import {log} from '../../utils/log';
import {checkFileIsBuilt} from '../../utils/file';
import {getCurrentPath} from '../../utils/path';
import {prompt} from '../commanders/prompt';
import context from '../context'

/**
 * 初始化项目信息
 * @param name 项目名称
 * @author chris lee
 * @Time 2020/11/20
 */
export const initProject = async (name:string):Promise<void> => {
    const path = getCurrentPath();
    const isBuild = await checkFileIsBuilt(path);
    let projectName = name;
    if(isBuild){
        log(`项目已在当前目录已存在，请重新命名`,'warning');
        const answer = await inquirer.prompt([prompt["rename"]]);
        projectName = answer.name;
    }
    context.setName(projectName);
    const langChoice = await inquirer.prompt([prompt['lang']]);
    context.setCodeType(langChoice.lang)
    console.log(context.progressStack)
}