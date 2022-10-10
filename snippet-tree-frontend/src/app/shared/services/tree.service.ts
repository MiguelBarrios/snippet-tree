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

  private activeTree: Tree  = new Tree();

  private currentPath: string[] = [];
  
  private selectedItemPath: string = "";

  private url = environment.baseUrl + 'api/v1/trees';
  constructor(private http:HttpClient, private auth: AuthService) { }


  getSelectedItemPath(){
    return this.selectedItemPath;
  }

  setSelectedItemPath(path:string){
    this.selectedItemPath = path;
  }

  getCurrentPath(){
    return this.currentPath;
  }

  setCurrentPath(path:string[]){
    this.currentPath = path;
  }

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
    return this.http.put<Tree>(url, this.activeTree,  this.auth.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(err);
      })
    )
  }

  counter(i: number) {
    return new Array(i);
}




  
  
}
