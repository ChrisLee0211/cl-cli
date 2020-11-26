import * as inquirer from 'inquirer';
import {log} from '../../utils/log';
import {checkFileIsBuilt} from '../../utils/file';
import {getCurrentPath,concatPath} from '../../utils/path';
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
    const isBuild = await checkFileIsBuilt(concatPath(path,name));
    let projectName = name;
    if(isBuild){
        log(`项目已在当前目录已存在，请重新命名`,'warning');
        const answer = await inquirer.prompt([prompt["rename"]]);
        projectName = answer.name;
    }
    context.setName(projectName);
    const langChoice = await inquirer.prompt([prompt['lang']]);
    context.setCodeType(langChoice.lang)
    const projectType = await inquirer.prompt([prompt['projectType']]);
    context.setProjectType(projectType.projectType);
    switch(projectType.projectType){
        case "admin":
        case "component":
            const frame = await inquirer.prompt([prompt['frame']]);
            if(frame.frame === 'vue'){
                const UiFrame = await inquirer.prompt(prompt['uiForVue']);
                context.setUI(UiFrame.ui)
            }
            if(frame.frame === 'react'){
                const UiFrame = await inquirer.prompt(prompt['uiForReact']);
                context.setUI(UiFrame.ui)
            }
            context.setFrame(frame.frame);
            context.setEnv('browser');
            break;
        case "utils":
            context.setEnv('browser');
            break;
        case "server":
            context.setEnv('node');
            break;
        default:
    }
    console.log(context.progressStack)
}