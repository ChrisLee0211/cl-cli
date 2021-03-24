interface baseConfig{
    name:string;
    [key:string]: any
}

/**
 * 输入配置上下文构造器，用于收集用户的选项供每一个生命周期使用
 * @param {string} name 项目名
 * @param {object} otherConfig 额外配置，非必穿，为{key:value}形式
 */
export class Ctx<T = any> {
    config:baseConfig = {name:""}
    template = "github:ChrisLee0211/rollupTs#main"
    extraConfig:T
    constructor(name:string, otherConfig?:any){
        this.config.name = name;
        this.extraConfig = otherConfig??{};
        this.add = this.add.bind(this);
        this.setTemplate = this.setTemplate.bind(this);
        this.getConfig = this.getConfig.bind(this);
    }
    /**
     * 添加选项到上下文
     * @param key 选项名
     * @param value 选项值
     */
    public add(key:string, value){
        if(key === "name"){
            throw new Error("Can not use prop \"name\" as config key");
        }
        this.extraConfig[key] = value;
    }
    /**
     * 设置基础模版
     * @param type 模板的仓库类型 "github"|"gitlab"|"bitbucket"
     * @param url 模板地址
     */
    public setTemplate(type:"github"|"gitlab"|"bitbucket", url:string){
        const target = url.split("com/")[1];
        const newTemplate = type+ ":"+target;
        this.template = newTemplate;
    }

    /**
     * 获取当前配置上下文
     * @returns {config}
     */
    public getConfig(){
        const result = {...this.config, ...this.extraConfig};
        return Object.freeze(result);
    }
}