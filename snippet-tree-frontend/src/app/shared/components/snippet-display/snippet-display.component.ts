import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnippetService } from '../../services/snippet.service';

@Component({
  selector: 'app-snippet-display',
  templateUrl: './snippet-display.component.html',
  styleUrls: ['./snippet-display.component.css']
})
export class SnippetDisplayComponent implements OnInit {

  constructor(private snippetService: SnippetService ) { }

  ngOnInit(): void {
    this.getSnippetById("633a0ff463687b9dfbc6f721");
  }

  getSnippetById(snippetId: String){
    console.log(snippetId);
    this.snippetService.getSnippetById(snippetId).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {

      }
    )
  }

}
