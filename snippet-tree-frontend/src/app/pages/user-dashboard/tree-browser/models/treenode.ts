export class Treenode {
    name:string;
    file:boolean;
    fileId:string;
    items:Treenode[];
    
    constructor(  name: string = "", file = false, fileId:string = "", items = []) {
        this.name = name;
        this.file = file;
        this.fileId = fileId;
        this.items = items;
    }
}
