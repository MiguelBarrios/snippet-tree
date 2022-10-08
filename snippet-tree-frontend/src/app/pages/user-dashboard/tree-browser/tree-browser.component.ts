import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnippetDisplayComponent } from 'src/app/shared/components/snippet-display/snippet-display.component';
import { TreeDisplayComponent } from 'src/app/shared/components/tree-display/tree-display.component';
import { TreeService } from 'src/app/shared/services/tree.service';
import { Tree } from './models/tree';
import { Treenode } from './models/treenode';

@Component({
  selector: 'app-tree-browser',
  templateUrl: './tree-browser.component.html',
  styleUrls: ['./tree-browser.component.css']
})
export class TreeBrowserComponent implements OnInit {

  trees:Tree[] = [];
  closeResult: string = "";
  newTreeName: string = "";

  constructor(private treeService:TreeService, private modalService: NgbModal,
    private treeDisplay: TreeDisplayComponent) { }

  ngOnInit(): void {
    this.getUserTrees();
  }

  getUserTrees(){
    this.treeService.getUserTrees().subscribe(
      (data) => {
        this.trees = data;
        console.log(this.trees);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  saveNewTree(tree:Tree){
    this.treeService.createNewTree(tree).subscribe(
      (data) => {
        console.log(data);
        this.trees.push(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  loadTree(tree:Tree){
    this.treeDisplay.loadTree(tree);
  }

  createNewTree(){
    console.log("creating new tree");
    let treeNode = new Treenode(this.newTreeName, false, null, []);
    let newTree = new Tree(null, null, this.newTreeName, treeNode);
    console.log(newTree);
    this.saveNewTree(newTree);
  }


  // -------------------------------- Modal methods --------------------
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
