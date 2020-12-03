type lifeType = 'init' | 'parse' | 'transform' 

class HookController {
    private initEvents:Array<Function> = []
    private parseEvents:Array<Function> = []
    private transformEvents:Array<Function> = []

    /**
     * 注册钩子
     * @param type 生命周期钩子
     * @param fn 回调函数
     */
    public register(type:lifeType, fn:Function):HookController{
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
                this.checkHookType(type);
        }
        return this
    }

    /**
     * 执行钩子
     * @param type 生命周期钩子类型
     * @returns {void}
     */
    public emitter(type:lifeType){
        let cb:Function | undefined;
        let queue: Array<Function>;
        switch(type){
            case "init":
                queue = this.initEvents
                break;
            case "parse":
                queue = this.parseEvents
                break;
            case "transform":
                queue = this.transformEvents
                break;
            default:
                this.checkHookType(type);
                queue = [];
        }
        while(queue.length){
            cb = queue.pop();
            if(typeof(cb)==="function"){
                cb()
            }else{
                throw new Error(`The lifeCylce callback expect a Function!`)
            }
        }
    }

    private checkHookType(type:lifeType):lifeType{
        if(!["init","parse","transform"].includes(type)){
            throw new Error(`No such type like ${type}!`)
        }
        return type
    }
}

export default new HookController();