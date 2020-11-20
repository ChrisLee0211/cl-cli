import inquirer from 'inquirer';
import {log} from '../../utils/log';
import * as fs from 'fs';
import {getCurrentPath} from '../../utils/path';

/**
 * 初始化项目信息
 * @param name 项目名称
 * @author chris lee
 * @Time 2020/11/20
 */
export const initProject = async (name:string):Promise<void> => {
    const path = getCurrentPath();
    
}