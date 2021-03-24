"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ctx = void 0;
/**
 * 输入配置上下文构造器，用于收集用户的选项供每一个生命周期使用
 * @param {string} name 项目名
 * @param {object} otherConfig 额外配置，非必穿，为{key:value}形式
 */
class Ctx {
    constructor(name, otherConfig) {
        this.config = { name: "" };
        this.template = "github:ChrisLee0211/rollupTs#main";
        this.config.name = name;
        this.extraConfig = otherConfig !== null && otherConfig !== void 0 ? otherConfig : {};
        this.add = this.add.bind(this);
        this.setTemplate = this.setTemplate.bind(this);
        this.getConfig = this.getConfig.bind(this);
    }
    /**
     * 添加选项到上下文
     * @param key 选项名
     * @param value 选项值
     */
    add(key, value) {
        if (key === "name") {
            throw new Error("Can not use prop \"name\" as config key");
        }
        this.extraConfig[key] = value;
    }
    /**
     * 设置基础模版
     * @param type 模板的仓库类型 "github"|"gitlab"|"bitbucket"
     * @param url 模板地址
     */
    setTemplate(type, url) {
        const target = url.split("com/")[1];
        const newTemplate = type + ":" + target;
        this.template = newTemplate;
    }
    /**
     * 获取当前配置上下文
     * @returns {config}
     */
    getConfig() {
        const result = Object.assign(Object.assign({}, this.config), this.extraConfig);
        return Object.freeze(result);
    }
}
exports.Ctx = Ctx;
//# sourceMappingURL=index.js.map