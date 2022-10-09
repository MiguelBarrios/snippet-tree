import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { main } from '@popperjs/core';
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

  activeDirectories: number = 1;

  constructor(private modalService: NgbModal, private snippetService:SnippetService,
    private snippetDisplay: SnippetDisplayComponent, private treeService:TreeService) { }

  ngOnInit(): void {
  }

  loadSelectedItem(){
    console.log("clicked????");
  }

  loadCreatedItem(item:Treenode){
    console.log(item);
    console.log(this.selectedTree);
  }

  createNewItem(){
    if(this.itemType == "file"){
      let snippet = new Snippet(null, []);
      console.log("snipet to save: ");
      console.log(snippet);
      this.snippetService.addSnippet(snippet).subscribe(
        (snippet) => {      
          this.createnNewSnippet(snippet);
          console.log("Saved snippet");
          console.log(snippet);
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
    this.snippetService.setActiveSnippet(snippet);
    let item = new Treenode(snippetName, true, snippet.id, []);
    let activeTree = this.treeService.getActiveTree();
    activeTree?.tree.items.push(item);
    this.treeService.saveActiveTree().subscribe(
      (data) => {
        this.treeService.setActiveTree(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  createNewDirectory(){
    console.log("Creating new Directory");
    let directoryName = this.newItemName;
    let item = new Treenode(directoryName, false, null);
    let activeTree = this.treeService.getActiveTree();
    activeTree?.tree.items.push(item);
    this.treeService.saveActiveTree().subscribe(
      (data) => {
        this.treeService.setActiveTree(data);
      },
      (error) => {
        console.log(error);
      }
    )

  }

  

  loadTree(){
    this.selectedTree = this.treeService.getActiveTree();
    if(this.selectedTree){
      let header = document.getElementById("treeDisplayHeader");
      if(header){
        header.textContent = this.selectedTree.treename;
      }
      this.renderDisplay();

    }

  }

  
  renderDisplay(){
    let activeTree = this.treeService.getActiveTree();
    var mainContainer = document.getElementById("tree-display");
    if(mainContainer){
      mainContainer.innerHTML = "";
      if(activeTree){
        let directoryContainer = this.buildDirectory(activeTree?.tree, "home-dir");
        mainContainer.appendChild(directoryContainer);
      }
      
      
    }
  }

  buildDirectory(directoryInfo:Treenode, id: string){
    let directoryContainer = document.createElement("div");
    directoryContainer.setAttribute("id", id);
    directoryContainer.classList.add("display-col", "col-2");
    console.log("Directory info");
    console.log(directoryInfo);

    let directoryItems = directoryInfo.items;
    for(let i = 0; i < directoryItems.length; ++i){
      let item = directoryItems[i];
      let itemContainer = this.buildItemContainer(item);
      directoryContainer.appendChild(itemContainer);
    }

    return directoryContainer;
  }




  buildItemContainer(item:Treenode){
    // outer container
    let container = document.createElement('div');
    container.classList.add('directory', 'm-2', 'w-100');

    // item container
    let itemContainer = document.createElement('button');
    itemContainer.textContent = item.name;
    itemContainer.addEventListener('click',this.loadSelectedItem );

    if(item.file){
      itemContainer.classList.add('btn', 'btn-outline-success', 'w-100');
    } 
    else{
      itemContainer.classList.add('btn', 'btn-outline-primary', 'w-100')
    }

    container.append(itemContainer);

    return container;
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

    counter(i: number) {
      return new Array(i);
  }
}
