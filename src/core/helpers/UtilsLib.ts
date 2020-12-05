import * as inquirer from 'inquirer';
import {log} from '../../utils/log';

/**
 * 使用命令交互指令
 * @param question 命令行提问配置
 * @returns {any} 返回终端用户输入内容
 */
const useCommand = async (question:inquirer.Question<{'answer':any}>):Promise<any> => {
    const target = question;
    target.name = 'answer';
    const result = await inquirer.prompt([question]);
    return result.answer
}

export default {
    useCommand,
    log,
}