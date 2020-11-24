import { rename } from 'fs';
import * as inquirer from 'inquirer';

interface renameQuestion extends inquirer.Question<{'name':string}>  {
    type:"input",
    message:string,
    name:string,
    default: string
}

interface langQuestion extends inquirer.Question<{'lang':lang}> {
    type:'list',
    message:string,
    name:string,
    choices:lang[]
}

interface promptConfig {
    rename:renameQuestion
    lang:langQuestion
}

export const prompt:promptConfig = {
    rename:{
        type:"input",
        message: '请输入项目名',
        name: 'name',
        default: 'my-project'
    },
    lang:{
        type: 'list',
        message: '使用哪种语言进行开发',
        name: 'lang',
        choices: ['typescript', 'javascript'],
    }
}