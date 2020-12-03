import {typeValidate} from '../utils/typeValidate';
import HookController from './helpers/HookController';

class ClCore {
    pluginsQueue:Array<any> = [];

    public use(plugin:any){
        this.pluginsQueue.push(plugin);
    }

    private installPlugins(){
        while(this.pluginsQueue.length){
            const plugin = this.pluginsQueue.pop();
            if(typeValidate(plugin,'function')){
                plugin()
            }else{

            }
            
        }
    }
}