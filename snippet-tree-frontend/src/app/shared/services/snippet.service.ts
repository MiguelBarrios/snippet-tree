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
    var url = this.url + '/snippetId'
    return this.http.get<Snippet>(url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('error getting snippet');
      })
    )

  }
}
