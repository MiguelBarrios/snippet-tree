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
    this.display = true;
  }

  turnOffDisplay(){
    this.display = false;
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
}
