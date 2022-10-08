import { Treenode } from "./treenode";

export class Tree {
    id: string;
    username:string;
    treename: string;
    tree: Treenode;


    constructor(  id: string = "", username:string = "", treename: string = "", tree = new Treenode() ) {
        this.id = id,
        this.username = username;
        this.treename = treename;
        this.tree = tree;
    }
}
