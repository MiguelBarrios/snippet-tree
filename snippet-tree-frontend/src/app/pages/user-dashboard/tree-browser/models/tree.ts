import { Treenode } from "./treenode";

export class Tree {
    id: string | null;
    username:string | null;
    treename: string;
    tree: Treenode;


    constructor(  id: string | null = null, username = null, treename: string = "", tree = new Treenode() ) {
        this.id = id,
        this.username = username;
        this.treename = treename;
        this.tree = tree;
    }
}
