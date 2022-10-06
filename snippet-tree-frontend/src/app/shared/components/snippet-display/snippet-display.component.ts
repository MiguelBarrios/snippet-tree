import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Snippet } from '../../models/snippet';
import { SnippetService } from '../../services/snippet.service';

@Component({
  selector: 'app-snippet-display',
  templateUrl: './snippet-display.component.html',
  styleUrls: ['./snippet-display.component.css']
})
export class SnippetDisplayComponent implements OnInit {

  activeSnippet: Snippet | null  = null;
  

  constructor(private snippetService: SnippetService ) { }

  ngOnInit(): void {
    this.getSnippetById("633f4a9c60e5d9630f9494fe");
  }


  getSnippetById(snippetId: String){
    console.log(snippetId);
    this.snippetService.getSnippetById(snippetId).subscribe(
      (snippet) => {
        console.log(snippet);
        this.activeSnippet = snippet;
      },
      (error) => {

      }
    )
  }

}
