import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Snippet } from '../models/snippet';
import { AuthService } from './auth.service';
import { TreeService } from './tree.service';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  private display: boolean  = false;
  private activeSnippet:Snippet | null = null;
  private snippetName:string = "";

  private url = environment.baseUrl + 'api/v1/snippets'

  constructor(private http:HttpClient,private authService:AuthService) { }

  turnOnDisplay(){
    let container = document.getElementById('snippet-display-container');
    if(container){
      container.classList.remove('hidden');
    }
  }

  turnOffDisplay(){
    let container = document.getElementById('snippet-display-container');
    if(container){
      container.classList.add('hidden');
    }
  }

  deleteActiveSnippet(){
    let url = this.url + '/' + this.activeSnippet?.id;
    return this.http.delete<void>(url, this.authService.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(err);
      })
    )
  }

  getDisplay(){
    return this.display;
  }

  getActiveSnippet(){
    return this.activeSnippet;
  }

  getActiveSnippetName(){
    return this.snippetName;
  }

  setActiveSnippet(snippet:Snippet, name:string){
    this.activeSnippet = snippet;
    this.snippetName = name;
  }

  getSnippetById(snippetId: String){
    var url = this.url + '/' + snippetId;
    return this.http.get<Snippet>(url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(err);
      })
    )
  }

  addSnippet(snippet:Snippet){
    var url = this.url;
    return this.http.post<Snippet>(url, snippet).pipe(
      catchError((err:any) => {
        return throwError(err);
      })
    )
  }

  saveSnippet(snippet:Snippet){
    var url = this.url;
    return this.http.put<Snippet>(url, snippet).pipe(
      catchError((err:any) => {
        return throwError(err);
      })
    )
  }

  loadSnippet(){
    console.log("******");
    let activeSnippet = this.getActiveSnippet();
    if(activeSnippet){
      // Load Snippet
      var element = document.getElementById("code-display-container");
      if(element){
        element.innerHTML = '';
        for(var line of activeSnippet.content){
          // fix form empty div
          if(line.length == 0){
            line += ' ';
          }
          
          let leadingSpaces = this.numLeadingSpaces(line);
          const spaces = ' '.repeat(leadingSpaces * 2);
          let div = document.createElement('div');
          div.textContent =  spaces + line;          
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


}
