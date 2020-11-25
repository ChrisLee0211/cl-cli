class Context implements contextCtr {
    config:config = {
        name:'',
        codeType:"typescript",
        projectType:"component",
        envType: 'browser',
        frameType:undefined,
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