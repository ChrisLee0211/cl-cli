"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const console_1 = require("console");
class CoreComplier {
    constructor(path) {
        this.complierLocalTemplate(path);
    }
    complierLocalTemplate(path) {
        // console.log('projectPath', path);
        fs.readdir(path, { withFileTypes: true }, (err, files) => {
            if (!err) {
                console_1.debug;
                console.log('files', files);
            }
            else {
                console.error(err);
            }
        });
    }
    ;
    complierExtra(list) {
    }
    output() {
    }
}
exports.default = CoreComplier;
//# sourceMappingURL=index.js.map