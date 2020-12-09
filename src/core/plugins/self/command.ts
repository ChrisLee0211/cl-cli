import * as inquirer from 'inquirer';


interface selectQuestion<T, key extends keyof T> extends inquirer.Question<T> {
    type:'list',
    message:string,
    name:string,
    choices:Array<T[key]>
}

type langQuestion = selectQuestion<{'lang':lang},'lang'>
type projectTypeQuestion = selectQuestion<{'projectType':projectType},'projectType'>
type frameTypeQuestion = selectQuestion<{'frame':frame},'frame'>
type envQuestion = selectQuestion<{'env':env},'env'>
type uiforVueQuestion = selectQuestion<{'ui':uiFrameForVue},'ui'>
type uiforReactQuestion = selectQuestion<{'ui':uiFrameForReact},'ui'>

interface promptConfig {
    lang:langQuestion
    projectType: projectTypeQuestion
    frame:frameTypeQuestion
    env: envQuestion
    uiForVue: uiforVueQuestion
    uiForReact: uiforReactQuestion
}

export const prompt:promptConfig = {
    lang:{
        type: 'list',
        message: '使用哪种语言进行开发',
        name: 'lang',
        choices: ['typescript', 'javascript'],
    },
    projectType:{
        type: 'list',
        message: '创建那种类型项目',
        name: 'projectType',
        choices: ['component', 'admin', 'utils', 'server'],
    },
    frame:{
        type: 'list',
        message: '使用哪种web框架',
        name: 'frame',
        choices: ['react','vue'],
    },
    env: {
        type: 'list',
        message: '项目用于以下哪种运行环境',
        name: 'env',
        choices: ['browser','node'],
    },
    uiForVue: {
        type: 'list',
        message: '使用以下何种UI框架',
        name: 'ui',
        choices: ['antd-vue', 'element', 'none'],
    },
    uiForReact: {
        type: 'list',
        message: '使用以下何种UI框架',
        name: 'ui',
        choices: ['antd', 'none'],
    }
}