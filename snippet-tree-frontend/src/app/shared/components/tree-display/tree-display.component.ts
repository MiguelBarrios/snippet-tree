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

  activeDirectories: number = 1;

  constructor(private modalService: NgbModal, private snippetService:SnippetService,
    private snippetDisplay: SnippetDisplayComponent, private treeService:TreeService) { }

  ngOnInit(): void {
  }


  loadCreatedItem(item:Treenode){
    
  }
  
  // Load selected tree in tree display
  loadTree(){
    let activeTree = this.treeService.getActiveTree();
    if(activeTree){
      let header = document.getElementById("treeDisplayHeader");
      if(header){
        header.textContent = activeTree.treename;
      }
      this.renderDisplay();
    }
  }

  loadSelectedItem = function(component:TreeDisplayComponent) {
      return function curried_func(e: any) {
        console.log(e.target);
        let path = e.target.getAttribute('myparam.path');
        let type = e.target.getAttribute('myparam.type');
        let fileid = null;
        if(type == 'file'){
          fileid = e.target.getAttribute('myParam.fileid');
        }

        component.renderDisplay2(path, type, fileid);
      }
  }


  //------------------------ Tree Modification functions -------------------------
  // add a new item to the active tree
  createNewItem(){
    if(this.itemType == "file"){
      let snippet = new Snippet(null, []);
      console.log("snipet to save: ");
      console.log(snippet);
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

  // Add a new snippet item to the active tree
  createnNewSnippet(snippet:Snippet){
    let snippetName = this.newItemName;
    this.snippetService.setActiveSnippet(snippet, snippetName);
    let item = new Treenode(snippetName, true, snippet.id, []);
    let activeTree = this.treeService.getActiveTree();
    activeTree?.tree.items.push(item);
    this.treeService.saveActiveTree().subscribe(
      (data) => {
        this.treeService.setActiveTree(data);
        this.loadTree();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // Add a new directory item into active tree
  createNewDirectory(){
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

  //------------------------ Gen Dynamic components -------------------------
  // renders the root directory in the tree display
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

  //Render the tree display based on provided path
  renderDisplay2(itemPath:string, type:string, fileid:string){

    let path = itemPath.split('-');

    // Selected item is a file
    if(type == 'file'){
      let fileName = path[path.length - 1];
      console.log("file is selected");
      this.snippetDisplay.getSnippetById(fileid, fileName);
      this.snippetService.turnOnDisplay();
    }
    else{
      console.log("Directory is selected");
      this.snippetService.turnOffDisplay();
    }
  }

  // Build a HTML component for  a given directory
  buildDirectory(directoryInfo:Treenode, id: string){
    let directoryContainer = document.createElement("div");
    directoryContainer.setAttribute("id", id);
    directoryContainer.classList.add("display-col", "col-2");
    let directoryItems = directoryInfo.items;
    for(let i = 0; i < directoryItems.length; ++i){
      let item = directoryItems[i];
      let itemContainer = this.buildItemContainer(item, directoryInfo.name);
      directoryContainer.appendChild(itemContainer);
    }

    return directoryContainer;
  }

  // Creates a HTML componet for a given treenode
  buildItemContainer(item:Treenode, path:string){
    // outer container
    let container = document.createElement('div');
    container.classList.add('directory', 'm-2', 'w-100');
    let itemType = (item.file) ? 'file' : 'directory';

    // item container
    let itemContainer = document.createElement('button');
    itemContainer.textContent = item.name;
    itemContainer.addEventListener('click', this.loadSelectedItem(this),false);
    let nodePath = path + '-' + item.name;
    itemContainer.setAttribute('myParam.path', nodePath);
    itemContainer.setAttribute('myParam.type', itemType);

    if(item.file){
      itemContainer.classList.add('btn', 'btn-outline-success', 'w-100');
      if(item.fileId){
        itemContainer.setAttribute('myParam.fileid', item.fileId);
      }
      
    } 
    else{
      itemContainer.classList.add('btn', 'btn-outline-primary', 'w-100')
    }

    container.append(itemContainer);

    return container;
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

    counter(i: number) {
      return new Array(i);
  }
}
