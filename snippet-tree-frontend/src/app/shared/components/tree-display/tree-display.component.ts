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
  selectedTree:Tree | null = null;
  closeResult = "";
  newItemName: string = "";
  itemType: string = "file";
  itemList: string[] = ['file', 'directory'];

  constructor(private modalService: NgbModal, private snippetService:SnippetService,
    private snippetDisplay: SnippetDisplayComponent, private treeService:TreeService) { }

  ngOnInit(): void {
  }

  loadCreatedItem(item:Treenode){
    console.log(item);
    console.log(this.selectedTree);
  }

  createNewItem(){
    if(this.itemType == "file"){
      let snippet = new Snippet(null, []);
      this.snippetService.addSnippet(snippet).subscribe(
        (snippet) => {      
          this.createnNewSnippet(snippet);
        },
        (error) => {
          console.log(error);
        }
      )
    }
    else{
      this.createNewDirectory();
    }
  }

  createnNewSnippet(snippet:Snippet){
    let snippetName = this.newItemName;
    let item = new Treenode(snippetName, true, snippet.id, []);
    let activeTree = this.treeService.getActiveTree();
    activeTree?.tree.items.push(item);
    console.log("updated tree");
    console.log(activeTree);
  }

  createNewDirectory(){
    console.log("Creating new Directory");
  }

  

  loadTree(){
    this.selectedTree = this.treeService.getActiveTree();
    if(this.selectedTree){
      let header = document.getElementById("treeDisplayHeader");
      if(header){
        header.textContent = this.selectedTree.treename;
      }
      this.renderDisplay(this.selectedTree.tree);

    }

  }

  renderDisplay(tree:Treenode){
    console.log("this.selectedTree: ");
    console.log(this.selectedTree);
  }

  // Modal functions
    // Modal methods
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
