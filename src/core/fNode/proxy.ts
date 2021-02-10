import fileNodeCtr from './main';
export default function proxyWrapper(fnode: typeof fileNodeCtr) {
    const frozenProps: string[] = ['parent',
        'children',
        'content',
        'isFolder',
        'fileName',
        'rootPath',
        'path',
        'isChanged',];
    let enableEdit = false;
    const handler:ProxyHandler<typeof fnode> = {
        set(target,keyName,receiver){
            if(!enableEdit){
                return false
            }else{
                if(typeof(keyName)=== 'string' && frozenProps.includes(keyName)){
                    return false
                }
                return true
            }
        },
        get(target,keyName,receiver){

        }
    };
    return new Proxy(fnode, handler)
}