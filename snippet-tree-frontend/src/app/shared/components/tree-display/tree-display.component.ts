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
  activeTree: boolean = false;

  addItemModalHeader: string = '';
  addItemPlacehoder: string = 'asdf';
  currentPath: string = '';

  //add new item var's
  newItemPath: string = "";

  constructor(private modalService: NgbModal, private snippetService:SnippetService,
               private snippetDisplay: SnippetDisplayComponent, private treeService:TreeService) { }

  ngOnInit(): void {
    this.treeService = this.treeService;
  }
  
  //------------------------ Tree Modification functions -------------------------
  // add a new item to the active tree
  createItem(type:string, content: any){
    this.itemType = type;
    this.addItemModalHeader = "Add " + type;
    this.addItemPlacehoder = type + ' name';
    this.currentPath = 'path: ' + this.treeService.getCurrentPath().join('/') + '/';
    this.open(content);
  }
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
          this.newItemName = '';
        },
        (error) => {
          console.log(error);
        }
      )
    }
    else{
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
            // this.treeService.renderDisplay(currentPath.join('-'), 'file', snippet.id);
            this.treeService.renderDisplay(currentPath.join('-'), 'directory', '');
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
        console.error(currentPath.join('-'));
        // this.treeService.renderDisplay();
        this.treeService.renderDisplay(currentPath.join('-'),'directory', '');
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
