"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const chalk = require("chalk");
exports.log = (txt, infoType) => {
    switch (infoType) {
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
};
//# sourceMappingURL=log.js.map