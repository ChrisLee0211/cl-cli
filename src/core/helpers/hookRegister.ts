type lifeType = 'init' | 'parse' | 'transform' 

class HookRegister {
    private initEvents:Array<Function> = []
    private parseEvents:Array<Function> = []
    private transformEvents:Array<Function> = []

    /**
     * 注册钩子
     * @param type 生命周期钩子
     * @param fn 回调函数
     */
    public register(type:lifeType, fn:Function):HookRegister{
        switch(type){
            case "init":
                this.initEvents.push(fn);
                break;
            case "parse":
                this.parseEvents.push(fn);
                break;
            case "transform":
                this.transformEvents.push(fn);
                break;
            default:
                if(!["init","parse","transform"].includes(type)){
                    throw new Error(`No such type like ${type}!`)
                }
        }
        return this
    }

    public emitter(type:lifeType){
        let cb:Function | undefined;
        switch(type){
            case "init":
                cb = this.initEvents.pop();
                break;
            case "parse":
                cb = this.parseEvents.pop();
                break;
            case "transform":
                cb = this.transformEvents.pop();
                break;
            default:
                if(!["init","parse","transform"].includes(type)){
                    throw new Error(`No such type like ${type}!`)
                }
        }
        if(typeof(cb)==="function"){
            cb()
        }else{
            throw new Error(`The lifeCylce callback expect a Function!`)
        }
    }
}

export default new HookRegister();