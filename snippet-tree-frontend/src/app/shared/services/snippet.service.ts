import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Snippet } from '../models/snippet';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  private url = environment.baseUrl + 'api/v1/snippets'

  constructor(private http:HttpClient) { }

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
