import fileNode from '../fNode/main';
import Queue from '../../utils/queue';
interface fileTree {
    findById(id:string):fileNode | undefined
    findByName(name:string):fileNode[]
}
class fileTreeCtr implements fileTree {
    tree:fileNode;
    constructor(root:fileNode){
        this.tree = root
        this.findById.bind(this)
        this.findByName.bind(this)
    }
    findById(id:string):fileNode | undefined{
        const queue = new Queue<fileNode>();
        let target:fileNode | undefined;
        queue.push(this.tree);
        while(queue.size() > 0) {
            const curNode = queue.pop();
            if(curNode){
                if(curNode.id === id){
                    target = curNode;
                    break
                }else{
                    if(curNode.children.length){
                        const len = curNode.children.length
                        for(let i=0;i<len;i++){
                            queue.push(curNode.children[i])
                        }
                    }
                }
            }
        };
        return target
    }
    findByName(name:string):fileNode[] {
        const reuslt = [];
        return reuslt
    }
}