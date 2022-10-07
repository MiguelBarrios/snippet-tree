import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Snippet } from '../../models/snippet';
import { SnippetService } from '../../services/snippet.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-snippet-display',
  templateUrl: './snippet-display.component.html',
  styleUrls: ['./snippet-display.component.css']
})
export class SnippetDisplayComponent implements OnInit {

  editFlag: boolean = false;
  activeSnippet: Snippet | null  = null;

  closeResult = "";
  

  constructor(private snippetService: SnippetService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getSnippetById("633f4a9c60e5d9630f9494fe");
  }


  getSnippetById(snippetId: String){
    console.log(snippetId);
    this.snippetService.getSnippetById(snippetId).subscribe(
      (snippet) => {
        console.log(snippet);
        this.activeSnippet = snippet;
        this.loadSnippet();
      },
      (error) => {

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

  loadSnippet(){
    if(this.activeSnippet){
      var space = document.createTextNode("\u00A0");

      var element = document.getElementById("code-display-container");
      if(element){
        element.innerHTML = '';

        for(var line of this.activeSnippet.content){

          let leadingSpaces = this.numLeadingSpaces(line);
          const spaces = ' '.repeat(leadingSpaces * 2);

          
          let div = document.createElement('div');
          div.textContent = spaces + line;          
          element.appendChild(div);
        }
      }      
    }
  }

  editSnippet(){

  }

  // Modal methods
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
