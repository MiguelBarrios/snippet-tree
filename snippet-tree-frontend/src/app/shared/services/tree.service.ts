import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TreeService {

  private url = environment.baseUrl + 'api/v1/trees';
  constructor(private http:HttpClient) { }


  
  
}
