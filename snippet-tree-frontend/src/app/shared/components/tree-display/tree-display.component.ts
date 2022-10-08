import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Tree } from 'src/app/pages/user-dashboard/tree-browser/models/tree';
import { Treenode } from 'src/app/pages/user-dashboard/tree-browser/models/treenode';

@Component({
  selector: 'app-tree-display',
  templateUrl: './tree-display.component.html',
  styleUrls: ['./tree-display.component.css']
})
export class TreeDisplayComponent implements OnInit {

  treeName:string = "Tree Display";
  selectedTree:Tree | null = null;
  closeResult = "";
  newItemName: string | null = null;
  itemType: string = "file";
  itemList: string[] = ['file', 'directory'];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  createNewItem(){
    console.log(this.newItemName);
    console.log(this.itemType);
    this.newItemName = null;
  }

  loadTree(tree:Tree){
    let header = document.getElementById("treeDisplayHeader");
    if(header){
      header.textContent = tree.treename;
    }
    this.renderDisplay(tree.tree);
  }

  renderDisplay(tree:Treenode){
    console.log(tree);
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
