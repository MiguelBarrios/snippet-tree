export class Treenode {
    name:string;
    file:boolean;
    fileId:string | null;
    items:Treenode[];
    
    constructor(  name: string = "", file = false, fileId:string | null = null, items = []) {
        this.name = name;
        this.file = file;
        this.fileId = fileId;
        this.items = items;
    }
}
