interface baseConfig{
    name:string;
    [key:string]: any
}

export class Ctx<T = any> {
    config:baseConfig = {name:''}
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
    
    public getConfig(){
        const result = {...this.config,...this.extraConfig}
        return Object.freeze(result)
    }
}