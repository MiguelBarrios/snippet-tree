import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Snippet } from '../../models/snippet';
import { SnippetService } from '../../services/snippet.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Clipboard} from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDashboardComponent } from 'src/app/pages/user-dashboard/user-dashboard/user-dashboard.component';
import { Tree } from 'src/app/pages/user-dashboard/tree-browser/models/tree';
import { TreeService } from '../../services/tree.service';
import { TreeDisplayComponent } from '../tree-display/tree-display.component';
import { ThisReceiver } from '@angular/compiler';



@Component({
  selector: 'app-snippet-display',
  templateUrl: './snippet-display.component.html',
  styleUrls: ['./snippet-display.component.css']
})
export class SnippetDisplayComponent implements OnInit {

  activeSnippet: boolean = false;
  editFlag: boolean = false;
  durationInSeconds = 5;

  closeResult = "";

  // update snippet form
  snippetContent:string = "";
  snippetName: string = "";
  

  constructor(private snippetService: SnippetService, private modalService: NgbModal, 
    private clipboard: Clipboard, private _snackBar: MatSnackBar,
    private treeService:TreeService) { }

  ngOnInit(): void {
  }


  snippetToString(snippet: Snippet)  {
    let str = "";
    for(let i of snippet.content){
      str += i + "\n";
    } 
    return str;
  }

  getItemName(){
    return this.snippetService.getActiveSnippetName();
  }

  getSnippetById(snippetId: String, name: string){
    this.snippetService.getSnippetById(snippetId).subscribe(
      (snippet) => {
        this.snippetService.setActiveSnippet(snippet, name);
        this.snippetContent = this.snippetToString(snippet);
        this.snippetName = name;
        this.loadSnippet();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  numLeadingSpaces(line:string) : number {
    let count = 0;
    for(let i = 0; i < line.length; ++i){
      let c = line.charAt(i);
      if(c == ' ' || c == ' '){
        ++count;
      }
      else{
        break;
      }
    }
    return count;
  }

  createNewSnippet(snippet:Snippet ){
    this.snippetService.addSnippet(snippet).subscribe(
      (snippet) => {
        console.log(snippet);
        this.loadSnippet();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  loadSnippet(){
    console.log("******");
    let activeSnippet = this.snippetService.getActiveSnippet();
    if(activeSnippet){

      // Load Snippet
      var element = document.getElementById("code-display-container");
      if(element){
        element.innerHTML = '';
        for(var line of activeSnippet.content){
          let leadingSpaces = this.numLeadingSpaces(line);
          const spaces = ' '.repeat(leadingSpaces * 2);
          let div = document.createElement('div');
          div.textContent =  line;          
          element.appendChild(div);
        }
      }      

      //create gutter
      var gutterContainer = document.getElementById('gutter-container');
      if(gutterContainer){
        gutterContainer.innerHTML = "";
        
        for(let i = 1; i <= activeSnippet.content.length; ++i){
          let row = document.createElement('div');
          row.classList.add('d-flex', 'justify-content-end')
          row.textContent = i.toString();
          gutterContainer.appendChild(row);
        }
      }
    }
  }

  deleteSnippet() {
    this.snippetService.deleteActiveSnippet().subscribe(
      (data) => {
        console.log("snippet deleted succesfullly");
        this.snippetService.turnOffDisplay();
        this.treeService.removeActiveSnippetFromTree();

        //refresh display
        let currentPath = this.treeService.getCurrentPath();
        console.log("****");
        console.log(currentPath);
        let path = this.treeService.getCurrentPath().join('-');
        console.log(path);
        this.treeService.renderDisplay(path, 'directory', '');
      },
      (error) => {
        console.log(error);
        console.error("Error deleting snippet");
      }
    )    
  }
  
  openEditor(){
    console.log("open editor");
    let snippet = this.snippetService.getActiveSnippet();
    let snippetName = this.snippetService.getActiveSnippetName();
    let editor = document.getElementById('editor');
    if(editor){
      let data = snippet?.content;
      if(data){
        let content = '';
        for(let i = 0; i < data.length; ++i){
          content += data[i] + '\n';
        }
        editor.innerHTML = content;
      }
    }
  }

  // Modal methods
  open(content: any) {
    let snippet = this.snippetService.getActiveSnippet();
    let snippetName = this.snippetService.getActiveSnippetName();
    console.log("snippet name: ");
    console.log(snippetName);
    if(snippet){
      this.snippetContent = this.snippetToString(snippet);
      this.snippetName = snippetName;
    }

    this.modalService.open(content, 
      {
        size: 'xl', 
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

  updateSnippet(){
    let activeSnippet = this.snippetService.getActiveSnippet();
    if(activeSnippet){
      let arr = this.snippetContent.split("\n");
      activeSnippet.content = arr;
      this.snippetService.saveSnippet(activeSnippet).subscribe(
        (snippet) => {
          this.snippetContent = this.snippetToString(snippet);
          this.snippetService.setActiveSnippet(snippet, this.snippetService.getActiveSnippetName());
          this.loadSnippet();
        },
        (error) => {
          console.log(error);
        }
      )
      this.loadSnippet();

    }

  }

  copyToClipBoard(){
    const pending = this.clipboard.beginCopy(this.snippetContent);
    let remainingAttempts = 3;
    const attempt = () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        // Remember to destroy when you're done!
        pending.destroy();
      }
    };
    attempt();
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.open("copied to clipboard", "✓", {
      duration: 2000
    });
  }
  

}
