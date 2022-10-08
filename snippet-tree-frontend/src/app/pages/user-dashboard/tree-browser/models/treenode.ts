export class Treenode {
    name:string;
    isFile:boolean;
    fileId:string | null;
    items:Treenode[];
    
    constructor(  name: string = "", isFile = false, fileId = null, items = []) {
        this.name = name;
        this.isFile = isFile;
        this.fileId = fileId;
        this.items = items;
    }
}
