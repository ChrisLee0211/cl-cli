interface fileNode {
    path:string,
    rootPath:string,
    fileName:string,
    content:any,
    parent:fileNode,
    children:fileNode[]
}