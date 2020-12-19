interface baseConfig{
    name:string;
    [key:string]: any
}

export class Ctx<T = any> {
    config:baseConfig = {name:''}
    template:string = 'https://github.com/ChrisLee0211/rollupTs.git'
    extraConfig:T
    constructor(name:string, otherConfig?:any){
        this.config.name = name;
        this.extraConfig = otherConfig??{}
        this.add = this.add.bind(this);
    }

    public add(key:string,value){
        if(key === 'name'){
            throw new Error(`Can not use prop "name" as config key`)
        }
        this.extraConfig[key] = value
    }
    public setTemplate(type:"github"|"gitlab"|"bitbucket",url:string){
        const target = url.split("com/")[1];
        const newTemplate = type+ ":"+target;
        this.template = newTemplate;
    }
    public getConfig(){
        const result = {...this.config,...this.extraConfig}
        return Object.freeze(result)
    }
}