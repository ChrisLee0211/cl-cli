import * as inquirer from 'inquirer';
interface renameQuestion extends inquirer.Question<{
    'name': string;
}> {
    type: "input";
    message: string;
    name: string;
    default: string;
}
interface langQuestion extends inquirer.Question<{
    'lang': lang;
}> {
    type: 'list';
    message: string;
    name: string;
    choices: lang[];
}
interface promptConfig {
    rename: renameQuestion;
    lang: langQuestion;
}
export declare const prompt: promptConfig;
export {};
