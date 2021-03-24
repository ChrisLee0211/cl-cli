interface baseConfig {
    name: string;
    [key: string]: any;
}
/**
 * 输入配置上下文构造器，用于收集用户的选项供每一个生命周期使用
 * @param {string} name 项目名
 * @param {object} otherConfig 额外配置，非必穿，为{key:value}形式
 */
export declare class Ctx<T = any> {
    config: baseConfig;
    template: string;
    extraConfig: T;
    constructor(name: string, otherConfig?: any);
    /**
     * 添加选项到上下文
     * @param key 选项名
     * @param value 选项值
     */
    add(key: string, value: any): void;
    /**
     * 设置基础模版
     * @param type 模板的仓库类型 "github"|"gitlab"|"bitbucket"
     * @param url 模板地址
     */
    setTemplate(type: "github" | "gitlab" | "bitbucket", url: string): void;
    /**
     * 获取当前配置上下文
     * @returns {config}
     */
    getConfig(): Readonly<{
        [x: string]: any;
        name: string;
    } & T>;
}
export {};
