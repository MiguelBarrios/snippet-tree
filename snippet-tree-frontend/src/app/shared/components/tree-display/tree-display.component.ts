import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Tree } from 'src/app/pages/user-dashboard/tree-browser/models/tree';
import { Treenode } from 'src/app/pages/user-dashboard/tree-browser/models/treenode';
import { Snippet } from '../../models/snippet';
import { SnippetService } from '../../services/snippet.service';
import { TreeService } from '../../services/tree.service';
import { SnippetDisplayComponent } from '../snippet-display/snippet-display.component';


@Component({
  selector: 'app-tree-display',
  templateUrl: './tree-display.component.html',
  styleUrls: ['./tree-display.component.css']
})
export class TreeDisplayComponent implements OnInit {

  treeName:string = "Tree Display";
  closeResult = "";
  newItemName: string = "";
  itemType: string = "file";
  itemList: string[] = ['file', 'directory'];

  //add new item var's
  newItemPath: string = "";

  constructor(private modalService: NgbModal, private snippetService:SnippetService,
               private snippetDisplay: SnippetDisplayComponent, private treeService:TreeService) { }

  ngOnInit(): void {
    this.treeService = this.treeService;
  }
  
  // Load selected tree in tree display
  loadTree(){
    let activeTree = this.treeService.getActiveTree();
    if(activeTree){
      let header = document.getElementById("treeDisplayHeader");
      if(header){
        header.textContent = activeTree.treename;
      }
      this.treeService.renderDisplay();
    }
  }




  //------------------------ Tree Modification functions -------------------------
  // add a new item to the active tree
  createNewItem(){
    let path = this.treeService.getCurrentPath();
    let parent = this.treeService.getActiveTree();

    let selectedTree = parent.tree;
    for(let i = 1; i < path.length; ++i){
      let target = path[i];
      selectedTree = this.treeService.findNextDirectory(selectedTree, target);
    }


    if(this.itemType == "file"){
      let snippet = new Snippet(null, []);
      this.snippetService.addSnippet(snippet).subscribe(
        (snippet) => {      
          this.addSnippetToTree(snippet, selectedTree);
        },
        (error) => {
          console.log(error);
        }
      )
    }
    else{
      console.log("here");

      this.addNewDirectoryToTree(selectedTree);
    }
  }

  // Add a new snippet item to the active tree
  addSnippetToTree(snippet:Snippet, treenode:Treenode){
    let snippetName = this.newItemName;
    this.snippetService.setActiveSnippet(snippet, snippetName);
    let item;
    if(snippet.id){
      item = new Treenode(snippetName, true, snippet.id, []);
          // let activeTree = this.treeService.getActiveTree();
    // activeTree?.tree.items.push(item);
    treenode.items.push(item);
    this.treeService.saveActiveTree().subscribe(
        (updatedTree) => {
          this.treeService.setActiveTree(updatedTree);
          let currentPath = this.treeService.getCurrentPath();
          let type = 'file';
          console.log(currentPath.join('-'));
          console.log(snippet.id);
          console.log(type);
          console.log(snippet);
          console.log(this.treeService.getActiveTree());
          if(snippet.id){
            this.treeService.renderDisplay2(currentPath.join('-'), 'file', snippet.id);
          }
        },
        (error) => {
          console.log(error);
        }
      )
    }
    }
    


  // Add a new directory item into active tree
  addNewDirectoryToTree(treenode:Treenode){
    let directoryName = this.newItemName;
    let item = new Treenode(directoryName, false);
    // let activeTree = this.treeService.getActiveTree();
    // activeTree?.tree.items.push(item);
    treenode.items.push(item);
    this.treeService.saveActiveTree().subscribe(
      (updatedTree) => {
        this.treeService.setActiveTree(updatedTree);
        // this.loadTree();
        let currentPath = this.treeService.getCurrentPath();
        console.log("**********");
        console.error(currentPath);
        this.treeService.renderDisplay();
      },
      (error) => {
        console.log(error);
      }
    )
  }

 
  // ---------------------- Modal functions ----------------------------------



  open(content: any) {
    this.modalService.open(content, 
      {
        size: 'md', 
        ariaLabelledBy: 'modal-basic-title',
      }
    ).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
