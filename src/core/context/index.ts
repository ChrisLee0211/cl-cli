class Context implements contextCtr {
    config:config = {
        name:'',
        codeType:"typescript",
        projectType:"component",
        envType: 'browser',
        frameType:undefined,
        ui: 'none',
        useEslint:true,
        useAxios:true};
    progressStack:Array<keyof config> = [];

    setName(name:string){
        this.config.name = name
    }

    setProjectType(type:projectType){
        this.config.projectType = type
    }

    setCodeType(type:lang){
        this.config.codeType = type
    }

    setEslint(state){
        this.config.useEslint = state
    }

    setAxios(state){
        this.config.useAxios = state
    }

    setFrame(frame:frame){
        this.config.frameType = frame
    }

    setUI(ui:ui){
        this.config.ui = ui
    }

    setEnv(env:env){
        this.config.envType = env;
    }

    pushToStack(configName:keyof config){
        this.progressStack.push(configName)
    }

    isFinish():boolean{
        const configNum = Object.keys(this.config).length;
        return this.progressStack.length === configNum
    }
    
}
export default new Context()

interface baseConfig{
    name:string;
    [key:string]: any
}
interface ss {
    [key:string]: any
}

export class Ctx<T = any> {
    config:baseConfig = {name:''}
    extraConfig:T
    constructor(name:string, otherConfig?:any){
        this.config.name = name;
        this.extraConfig = otherConfig??{}
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