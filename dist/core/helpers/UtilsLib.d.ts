import * as inquirer from 'inquirer';
declare const _default: {
    useCommand: <T>(question: inquirer.Question<T>, property: string) => Promise<any>;
    log: (txt: string, infoType: "warning" | "success" | "danger") => void;
};
export default _default;
