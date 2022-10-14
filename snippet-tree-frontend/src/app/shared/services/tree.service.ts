import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TreeSummery } from 'src/app/pages/user-dashboard/tree-browser/models/tree-summery';
import { catchError, throwError } from 'rxjs';
import { Tree } from 'src/app/pages/user-dashboard/tree-browser/models/tree';
import { SnippetService } from './snippet.service';
import { Treenode } from 'src/app/pages/user-dashboard/tree-browser/models/treenode';


@Injectable({
  providedIn: 'root'
})
export class TreeService {

  private activeTree: Tree  = new Tree();

  private currentPath: string[] = [];
  
  private selectedItemPath: string = "";

  private url = environment.baseUrl + 'api/v1/trees';
  constructor(private http:HttpClient, private auth: AuthService, private snippetService:SnippetService) { }

  loadTree(tree:Tree){
    this.setActiveTree(tree);
    this.setCurrentPath([tree.treename]);
    let activeTree = this.activeTree;
    if(activeTree){
      let header = document.getElementById("treeDisplayHeader");
      if(header){
        header.textContent = activeTree.treename;
      }
      // this.renderDisplay();
      this.renderDisplay(this.currentPath.join('-'),'directory', '');
    }


  }

  removeActiveSnippetFromTree(){
    console.log("------------ removing snippet ref from tree -----------------------")
    let tree = this.activeTree.tree;
    console.log(this.currentPath);
    for(let i = 1; i < this.currentPath.length; ++i){
      let target = this.currentPath[i];
      tree = this.findNextDirectory(tree, target);
    }

    let activeSnippet = this.snippetService.getActiveSnippet();
    console.log("last tree");
    console.log(tree);
    //remove ref from tree;
    var idx = tree.items.findIndex(item => item.fileId == activeSnippet?.id);
    tree.items.splice(idx,1); 
  }

  findNextDirectory(tree:Treenode, target:string){
    for(let i = 0; i < tree.items.length; ++i){
      let cur = tree.items[i];
      if(cur.name == target){
        return cur;
      }
    }
    return new Treenode();
  }

  getSelectedItemPath(){
    return this.selectedItemPath;
  }

  setSelectedItemPath(path:string){
    this.selectedItemPath = path;
  }

  getCurrentPath(){
    return this.currentPath;
  }

  setCurrentPath(path:string[]){
    this.currentPath = path;
  }

  setActiveTree(tree:Tree){
    this.activeTree = tree;
  }

  getActiveTree(){
    return this.activeTree;
  }

  getUserTrees(){
    var url = this.url + "/users";
    return this.http.get<Tree[]>(url, this.auth.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(err);
      })
    )
  }

  createNewTree(tree:Tree){
    var url = this.url;
    return this.http.post<Tree>(url, tree, this.auth.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(err);
      })
    )
  }

  saveActiveTree(){
    var url = this.url;
    return this.http.put<Tree>(url, this.activeTree,  this.auth.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(err);
      })
    )
  }


  // render snippet display

 //------------------------ Gen Dynamic components -------------------------

  //Render the tree display based on provided path
  // TODO: reload screen when new item is created
  // TODO: fix bug, directory header is displayed when new file is created
  renderDisplay(itemPath:string, type:string, fileid:string){
    console.log("renderDispalay2()");
    let path = itemPath.split('-');
    console.log("Rendering " + type + " : ");
    console.log(path);

    // Selected item is a file
    if(type == 'file'){
      let fileName = path[path.length - 1];
      this.snippetService.getSnippetById(fileid).subscribe(
        (snippet) => {
          this.snippetService.setActiveSnippet(snippet, fileName);
          this.snippetService.turnOnDisplay();
        }
      )      
    }
    else{
          // Directory selected, turn of display
          this.snippetService.turnOffDisplay();
          this.currentPath = path;
          let activeTree = this.activeTree;
          let root = activeTree?.tree;
          console.log(root);

          // ---------------------------------------------------
          let display = document.getElementById('tree-display');
          if(display){
            display.innerHTML = '';
            //build root directory
            let rootContainer = this.buildDirectory(root, path[0]);
            display.appendChild(rootContainer);

            // Build rest of tree
            let tree = root;
            let nextpath = path[0];
            for(let i = 1; i < path.length; ++i){
              nextpath = nextpath + '-' + path[i];
              console.log("Next path: " + nextpath);
              
              let nextDirName = path[i];
              let nextDir = this.findNextDirectory(tree, nextDirName);
              
              //build nextdir
              if(nextDir){
                let dirContainer =  this.buildDirectory(nextDir, nextpath);
                display.appendChild(dirContainer);
              }
              tree = nextDir;
            } 

            //Add item section
            let addItemContainer = document.createElement('div');
            addItemContainer.classList.add('display-col', 'col-2', 'd-flex', 'flex-column','align-items-center');

            let img = document.createElement('img');
            img.classList.add('svgimg', 'mx-2');
            img.setAttribute('height', '25px');
            img.setAttribute('width', '25px');
            img.setAttribute('src', 'assets/img/add-folder.svg');
            addItemContainer.appendChild(img);

            let img2 = document.createElement('img');
            img2.classList.add('svgimg', 'mx-2');
            img2.setAttribute('height', '25px');
            img2.setAttribute('width', '25px');
            img2.setAttribute('src', 'assets/img/add-document.svg');
            addItemContainer.appendChild(img2);

            display.appendChild(addItemContainer);

          }
          // this.buildAddFileGutter(path);
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
      let itemContainer = this.buildItemContainer(item, id + "-" + item.name);
      directoryContainer.appendChild(itemContainer);
    }

    return directoryContainer;
  }

  loadSelectedItem = function(treeService:TreeService) {
    return function curried_func(e: any) {
      console.log("loadSelectedItem()");
      console.log(e.target);
      let path = e.target.getAttribute('myparam.path');
      let type = e.target.getAttribute('myparam.type');
      console.log("Path to render: " + path);

      let fileid = null;
      if(type == 'file'){
        fileid = e.target.getAttribute('myParam.fileid');
      }
      treeService.renderDisplay(path, type, fileid);
    }
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
    let nodePath = path;
    itemContainer.setAttribute('myParam.path', nodePath);
    itemContainer.setAttribute('myParam.type', itemType);

    if(item.file){
      itemContainer.classList.add('btn', 'btn-outline-success', 'w-100');
      itemContainer.setAttribute('myParam.fileid', item.fileId);
    } 
    else{
      itemContainer.classList.add('btn', 'btn-outline-primary', 'w-100')
    }

    container.append(itemContainer);
    return container;
  }

  //Create Add File Gutter
  buildAddFileGutter(directories: string[]){
    let container = document.getElementById('addFileGutter');
    if(container){
      container.classList.add('display-col',  'd-flex');
      container.innerHTML = '';
      let path = "";
      for(let i = 0; i < directories.length; ++i){
        path += directories[i];
        let itemContainer = this.buildAddItemContainer(path);
        container.appendChild(itemContainer);
        if(i < directories.length - 1){
          path += '-';
        }
      }
    }
  }
  //Create Add File Container
  buildAddItemContainer(param:string){
    let container = document.createElement('div');
    container.classList.add('d-flex', 'justify-content-center', 'col-2');

    let img = document.createElement('img');
    img.classList.add('svgimg', 'mx-2');
    img.setAttribute('height', '25px');
    img.setAttribute('width', '25px');
    img.setAttribute('src', 'assets/img/add-folder.svg');
    img.setAttribute('myparam.path', param);
    container.appendChild(img);
    container.addEventListener('click', this.openAddItemModal(this),false);
    return container;
  }

  openAddItemModal = function(treeService:TreeService) {
    return function curried_func(e: any) {
      document.getElementById('addItemModalBtn')?.click();
      let path = e.target.getAttribute('myparam.path');
      treeService.setSelectedItemPath(path);
    }
  }




  
  
}
