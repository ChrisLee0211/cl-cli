import fileNodeCtr from './main';
export default function proxyWrapper (fnode:typeof fileNodeCtr){
    const handler = {};
    return new Proxy(fnode,handler)
}