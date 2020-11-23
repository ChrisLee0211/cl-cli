import { rename } from 'fs';
import * as inquirer from 'inquirer';

interface inputQuestion extends inquirer.Question<{'name':string}>  {
    type:"input",
    message:string,
    name:string,
    default: string
}

interface promptConfig {
    rename:inputQuestion
}

export const prompt:promptConfig = {
    rename:{
        type:"input",
        message: '请输入项目名',
        name: 'name',
        default: 'my-project'
    }
}