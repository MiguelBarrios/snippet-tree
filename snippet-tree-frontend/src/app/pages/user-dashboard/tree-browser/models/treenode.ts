export class Treenode {
    name:string;
    isFile:boolean;
    fileId:string;
    items:Treenode[];
    
    constructor(  name: string = "", isFile = false, fileId = "", items = []) {
        this.name = name;
        this.isFile = isFile;
        this.fileId = fileId;
        this.items = items;
    }
}
