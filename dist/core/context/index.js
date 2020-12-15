"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ctx = void 0;
class Ctx {
    constructor(name, otherConfig) {
        this.config = { name: '' };
        this.config.name = name;
        this.extraConfig = otherConfig !== null && otherConfig !== void 0 ? otherConfig : {};
        this.add = this.add.bind(this);
    }
    add(key, value) {
        if (key === 'name') {
            throw new Error(`Can not use prop "name" as config key`);
        }
        this.extraConfig[key] = value;
    }
    getConfig() {
        const result = Object.assign(Object.assign({}, this.config), this.extraConfig);
        return Object.freeze(result);
    }
}
exports.Ctx = Ctx;
//# sourceMappingURL=index.js.map