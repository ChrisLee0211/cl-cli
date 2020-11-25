import * as inquirer from 'inquirer';
interface renameQuestion extends inquirer.Question<{
    'name': string;
}> {
    type: "input";
    message: string;
    name: string;
    default: string;
}
interface selectQuestion<T, key extends keyof T> extends inquirer.Question<T> {
    type: 'list';
    message: string;
    name: string;
    choices: Array<T[key]>;
}
declare type langQuestion = selectQuestion<{
    'lang': lang;
}, 'lang'>;
declare type projectTypeQuestion = selectQuestion<{
    'projectType': projectType;
}, 'projectType'>;
declare type frameTypeQuestion = selectQuestion<{
    'frame': frame;
}, 'frame'>;
declare type envQuestion = selectQuestion<{
    'env': env;
}, 'env'>;
interface promptConfig {
    rename: renameQuestion;
    lang: langQuestion;
    projectType: projectTypeQuestion;
    frame: frameTypeQuestion;
    env: envQuestion;
}
export declare const prompt: promptConfig;
export {};
