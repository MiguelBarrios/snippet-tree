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

  private activeTree: Tree | null = null;

  private url = environment.baseUrl + 'api/v1/trees';
  constructor(private http:HttpClient, private auth: AuthService) { }

  setActiveTree(tree:Tree){
    this.activeTree = tree;
  }

  getActiveTree(){
    return this.activeTree;
  }

  getUserTrees(){
    var url = this.url + "/users";
    return this.http.get<Tree[]>(url, this.auth.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(err);
      })
    )
  }

  createNewTree(tree:Tree){
    var url = this.url;
    return this.http.post<Tree>(url, tree, this.auth.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(err);
      })
    )
  }

  saveActiveTree(){
    var url = this.url;
    return this.http.put(url, this.activeTree,  this.auth.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(err);
      })
    )
  }


  
  
}
