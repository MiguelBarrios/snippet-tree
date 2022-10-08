import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TreeSummery } from 'src/app/pages/user-dashboard/tree-browser/models/tree-summery';
import { catchError, throwError } from 'rxjs';
import { Tree } from 'src/app/pages/user-dashboard/tree-browser/models/tree';


@Injectable({
  providedIn: 'root'
})
export class TreeService {

  private url = environment.baseUrl + 'api/v1/trees';
  constructor(private http:HttpClient, private auth: AuthService) { }

  getUserTrees(){
    var url = this.url + "/users";
    return this.http.get<Tree>(url, this.auth.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(err);
      })
    )
  }


  
  
}
