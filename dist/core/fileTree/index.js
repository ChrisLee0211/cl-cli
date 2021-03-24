"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("../../utils/queue");
class fileTreeCtr {
    constructor(root) {
        this.tree = root;
        this.findById.bind(this);
        this.findByName.bind(this);
    }
    findById(id) {
        const queue = new queue_1.default();
        let target;
        queue.push(this.tree);
        while (queue.size() > 0) {
            const curNode = queue.pop();
            if (curNode) {
                if (curNode.id === id) {
                    target = curNode;
                    break;
                }
                else {
                    if (curNode.children.length) {
                        const len = curNode.children.length;
                        for (let i = 0; i < len; i++) {
                            queue.push(curNode.children[i]);
                        }
                    }
                }
            }
        }
        ;
        return target;
    }
    findByName(name) {
        const reuslt = [];
        const queue = new queue_1.default();
        queue.push(this.tree);
        while (queue.size() > 0) {
            const curNode = queue.pop();
            if (curNode) {
                if (curNode.fileName === name) {
                    reuslt.push(curNode);
                    break;
                }
                else {
                    if (curNode.children.length) {
                        const len = curNode.children.length;
                        for (let i = 0; i < len; i++) {
                            queue.push(curNode.children[i]);
                        }
                    }
                }
            }
        }
        ;
        return reuslt;
    }
    getRoot() {
        return this.tree;
    }
}
exports.default = fileTreeCtr;
//# sourceMappingURL=index.js.map