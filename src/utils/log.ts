import * as chalk from 'chalk';

type infoColor = "success" | "warning" | "danger"

export const log = (txt:string, infoType:infoColor) => {
    switch(infoType){
        case "success":
            console.log(chalk.green.bold(txt));
            break;
        case "warning":
            console.log(chalk.yellow.bold(txt));
            break;
        case "danger":
            console.log(chalk.red.bold(txt));
            break;
        default:
            console.log(chalk.green.bold(txt));
    }
}