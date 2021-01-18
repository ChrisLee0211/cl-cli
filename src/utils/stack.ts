/**
 * 接口名称：双向链表生成器
 */
interface doubleLink {
    head: node |null//头部节点引用
    tail: node |null//尾部节点引用
    size: number //节点的个数
    addOnHead(node: any): any
    addOnTail(node: any): any
    deleteOnHead(): any
    deleteOnTail(): any
    reverseAll():any
}

/**
 * 双向链表
 * 功能：
 * 1、头部增加节点
 * 2、尾部增加节点
 * 3、头部删除节点(弹出头部节点)
 * 4、尾部删除节点(弹出尾部节点)
 * 5、判断节点是否在链表中
 * 6、删除指定的节点
 * 7、在指定节点的前或后增加节点
 * 8、获取链表的节点个数
 * 9、打印所有节点
 * 10.反转链表
 */
export class DoubleLinkList implements doubleLink {
    head: node|null
    tail: node|null
    size: number = 0

    constructor() {
        this.head = null;
        this.tail = null
    }
    //向头部增加节点
    addOnHead(node: any) {
        let _node: node = new Node(node);
        if (this.size === 0) {
            this.head = _node;
            this.tail = _node;
            _node.pre = null;
            _node.next = null;
            this.size += 1
        } else {
            let old_head: node = this.head as node;
            this.head = _node;
            _node.next = old_head
            old_head.pre = _node;
            this.size += 1
        }
    }
    //向尾部增加节点
    addOnTail(node: any) {
        let _node: node = new Node(node);
        if (this.size === 0) {
            this.head = _node;
            this.tail = _node;
            _node.pre = null;
            _node.next = null;
            this.size += 1
        } else {
            let old_tail: node = this.tail as node;
            this.tail = _node;
            _node.pre = old_tail;
            old_tail.next = _node;
            this.size += 1
        }
    }
    //头部删除节点
    deleteOnHead() {
        if (this.size === 0) {
            console.error('No Node In DoubleLinkList!')
            return
        }
        if (this.size < 2) {
            let currentNode: node = this.head as node;
            this.head = null;
            this.tail = null;
            this.size = 0;
            return currentNode
        }
        if (this.size >= 2) {
            let old_head: node = this.head as node;
            let new_head: node = old_head.next;
            if (this.size === 2) {
                this.size = 0;
                this.head = null;
                this.tail = null;
                this.addOnHead(new_head.target)
            } else {
                this.head = new_head;
                new_head.pre = null;
                this.size = this.size - 1;
            }
            return new_head
        }
    }
    //尾部删除节点
    deleteOnTail() {
        if (this.size === 0) {
            console.error('No Node In DoubleLinkList!')
            return
        }
        if (this.size < 2) {
            let currentNode: node = this.tail as node;
            this.head = null;
            this.tail = null;
            this.size = 0;
            return currentNode
        }
        if (this.size >= 2) {
            let old_tail: node = this.tail as node;
            let new_tail: node = old_tail.pre;
            if (this.size === 2) {
                this.size = 0;
                this.head = null;
                this.tail = null;
                this.addOnTail(new_tail.target);
            } else {
                this.tail = new_tail;
                new_tail.next = null;
                this.size = this.size - 1
            }
            return new_tail
        }
    }
    //判断节点是否在链表中
    getNode(val: any) {
        let _node: node = new Node(val)
        let currentNode: node = this.head as node;
        if (this.size === 0) {
            return false
        } else {
            let length: number = this.size;
            let c: string = JSON.stringify(currentNode.target);
            let n: string = JSON.stringify(_node.target);
            while (c != n) {
                if (length > 1) {
                    currentNode = currentNode.next;
                    c = JSON.stringify(currentNode.target);
                    length = length - 1
                } else {
                    return false
                }
            }
            return true
        }
    }

    //删除指定的节点
    removeNode(val: any) {
        let _node: node = new Node(val)
        let judgeNode: boolean = this.getNode(val);
        if (judgeNode === false) {
            console.error('No This Node In DoubleLinkList!');
            return
        }
        if (this.size === 1) {
            let h: string = JSON.stringify((this.head as node).target);
            let n: string = JSON.stringify(_node.target)
            if (h === n) {
                this.head = null;
            }
            if (h === n) {
                this.tail = null
            }
            this.size = 0
        } else {
            let currentNode = this.head;
            let c: string = JSON.stringify((currentNode as node).target)
            let n: string = JSON.stringify(_node.target)
            while (c != n) {
                currentNode = (currentNode as node).next;
                c = JSON.stringify((currentNode as node).target)
            };
            let preNode: node = (currentNode as node).pre === null ? null : (currentNode as node).pre;
            let nextNode: node = (currentNode as node).next === null ? null : (currentNode as node).next;
            if (preNode === null) {
                this.deleteOnHead()
            }
            if (nextNode === null) {
                this.deleteOnTail()
            }
            if (preNode !== null && nextNode !== null) {
                preNode.next = nextNode;
                nextNode.pre = preNode
            }
        }
    }

    /**
     * 
     * @param val 要插入的节点
     * @param ele 被插入的节点
     * @param type 插入的位置：next or pre
     */
    insertNode(val: any, ele: any, type: string) {
        let _ele: node = new Node(ele);
        let _node: node = new Node(val);
        let currentNode: node = this.head as node;
        let c: string = JSON.stringify(currentNode.target);
        let e: string = JSON.stringify(_ele.target);
        if (!this.getNode(ele)) {
            console.error(`Can Not Find Node ${e}`);
            return
        }
        while (c !== e) {
            currentNode = currentNode.next;
            c = JSON.stringify(currentNode.target)
        }
        _ele = currentNode;
        if (type === 'next') {
            if (_ele.next === null) {
                this.addOnTail(_node.target);
                return
            }
            let nextNode: node = _ele.next;
            let nextNextNode: node = nextNode.next;
            _node.pre = nextNode;
            _node.next = nextNextNode;
            nextNode.next = _node;
            nextNextNode.pre = _node;
        }
        if (type === 'pre') {
            if (_ele.pre === null) {
                this.addOnHead(_node.target);
                return
            }
            let preNode: node = _ele.pre;
            let prePreNode: node = preNode.pre;
            _node.pre = prePreNode;
            _node.next = preNode;
            prePreNode.next = _node;
            preNode.pre = _node
        }
        return _node
    }

    //获取链表的节点个数
    countNodes() {
        return this.size
    }

    //打印所有节点
    getAllNode() {
        let str: string = '';
        let currentNode: node = this.head as node;
        if (currentNode === null) return
        while (currentNode.next !== null) {
            let targetContent:string = typeof(currentNode.target) === 'function'?String(currentNode.target):JSON.stringify(currentNode.target);
            str = str + targetContent;
            currentNode = currentNode.next
        }
        str = str + JSON.stringify((this.tail as node).target)
        console.log(str)
    }

    //反转链表
    reverseAll():void{
        let new_doubleLinkList = new DoubleLinkList();
        let cur:node = this.head as node;
        while(cur.next!=null){
            let next:Node = cur.next;
            new_doubleLinkList.addOnHead(cur.target);
            cur = next;
        };
        this.head = new_doubleLinkList.head;
        this.addOnHead(cur.target)
        this.tail = new_doubleLinkList.tail;
        
    }
}

/**
 * 类名称：节点生成器
 * 功能：创建一个包含key：value的节点并返回
 * 用法：接受一个（key：vakue）的对象作为参数，返回该节点
 * 可用方法：
 *   xxx.key：返回该节点的key
 */
interface node {
    target: any,
    pre: any,
    next: any
}

export class Node implements node {
    target: any
    pre: any = null
    next: any = null
    constructor(obj: any) {
        this.target = obj;
        this.val()
    }
    val() {
        return this.target
    }
}

/**
 * 关于栈结构的接口
 */
interface stack {
    length:number,
    push(item:any):number,
    pop():any 
    clear():void
    doubleLink:DoubleLinkList //双向链表，用于储存栈结构
}

export class Stack implements stack {
    length:number = 0
    doubleLink:DoubleLinkList 
    constructor(){
        this.doubleLink = new DoubleLinkList();
        this.length = this.doubleLink.countNodes();

    };

    /**
     * 把一个元素推入栈中
     * @param item :推入栈顶的元素
     * @returns {number} 此时栈内元素的数量
     */
    push(item:any):number{
        let index:number = NaN;
        let currentItem:node = item;
        let size:number = this.doubleLink.countNodes();
        this.doubleLink.addOnHead(currentItem);
        this.length = this.doubleLink.countNodes()
        index = size + 1
        return index
    }

    /**
     * 弹出栈顶的元素
     * @param
     * @returns {any} 被弹出的元素
     */
    pop(){
        if(this.length === 0) return null
        let result:node;
        result = this.doubleLink.head as node;
        this.doubleLink.deleteOnHead();
        this.length = this.doubleLink.countNodes();
        return result.target
    }

    /**
     * 清空栈
     */
    clear(){
        let size:number = this.doubleLink.countNodes();
        while(size > 1){
            this.doubleLink.deleteOnHead();
            size = this.doubleLink.countNodes()
        };
        this.length = this.doubleLink.countNodes()
        return
    }

    /**
     * 打印栈内所有元素
     */
    getAll():Array<any>{
        let head:node = this.doubleLink.head as node;
        let arr:Array<any> = []
        let current:node;
        let size:number = this.doubleLink.countNodes();
        let count:number = 0;
        while(count < size){
            let cur:any = head;
            arr.push(cur.target);
            head = cur.next;
            count ++
        }
        return arr
    }

}