import fileNode from '../fNode/main';

interface fileTree {
    findById(id:string):fileNode | undefined
    findByName(name:string):fileNode[]
    writeById(id:string, content): Promise<boolean>
}
class fileTreeCtr implements fileTree {
    tree:fileNode;
    constructor(root:fileNode){
        this.tree = root
        this.findById.bind(this)
        this.findByName.bind(this)
        this.writeById.bind(this)
    }
    findById(id:string):fileNode | undefined{

    }
    findByName(name:string):fileNode[] {

    }
    writeById(id:string, content): Promise<boolean> {

    }
}