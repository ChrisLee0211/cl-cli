type lifeType = 'init' | 'parse' | 'transform' 

/** 通过ctx增删复写配置 */
export type initFn = (ctx:any) => {}
/** 通过ruleSetter自定义配置解析规则 */
export type parseFn = (ruleSetter:any) => {}
/** 最后机会修改输出文件内容 */
export type transFn = (fileMemory:any) => {}

class HookController {
    private initEvents:Array<Function> = []
    private parseEvents:Array<Function> = []
    private transformEvents:Array<Function> = []

    /**
     * 注册钩子
     * @param type 生命周期钩子
     * @param fn 回调函数
     */
    public register(type:'init',fn:initFn):void
    public register(type:'parse',fn:parseFn):void
    public register(type:'transform',fn:transFn):void
    public register(type:lifeType, fn:Function):void{
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