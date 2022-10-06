import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  private url = environment.baseUrl + 'api/v1/snippets/'

  constructor(private http:HttpClient) { }

  getSnippetById(snippetId: String){
    // return this.http.get<>

  }
}
