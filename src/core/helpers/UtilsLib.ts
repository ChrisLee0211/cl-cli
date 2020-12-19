import * as inquirer from 'inquirer';
import {log} from '../../utils/log';
import gitDownload from 'download-git-repo';

/**
 * 使用命令交互指令
 * @param question 命令行提问配置
 * @returns {any} 返回终端用户输入内容
 */
const useCommand = async <T>(question:inquirer.Question<T>, property:string):Promise<any> => {
    const result = await inquirer.prompt([question]);
    return result[property]
}

const templateDownload = (url) => {
    gitDownload(url)
}

export default {
    useCommand,
    log,
}