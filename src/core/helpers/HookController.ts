import Utils from './UtilsLib';
type lifeType = 'init' | 'parse' | 'transform' 

/** 通过ctx增删复写配置 */
export type initFn<T> = (ctx:T) => void
/** 通过ruleSetter自定义配置解析规则 */
export type parseFn<T> = (ruleSetter:any) => void
/** 最后机会修改输出文件内容 */
export type transFn<T> = (fileMemory:any) => void

class HookController{
    private initEvents:Array<Function> = []
    private parseEvents:Array<Function> = []
    private transformEvents:Array<Function> = []

    /**
     * 注册钩子
     * @param type 生命周期钩子
     * @param fn 回调函数
     */
    public register<T>(type:'init',fn:initFn<T>):void
    public register<T>(type:'parse',fn:parseFn<T>):void
    public register<T >(type:'transform',fn:transFn<T>):void
    public register<T>(type:lifeType, fn:Function):void{
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
    public emitter<T>(type:'init',args:[T,typeof Utils]);
    public emitter<T>(type:'parse',args:[]);
    public emitter<T>(type:'transform',args:[]);
    public emitter(type:lifeType,args:any[]){
        let cb:Function | undefined;
        let queue: Array<Function>;
        switch(type){
            case "init":
                queue = this.initEvents;
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
                cb(...args)
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