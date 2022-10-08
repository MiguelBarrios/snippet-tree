import { Component, OnInit } from '@angular/core';
import { TreeService } from 'src/app/shared/services/tree.service';
import { Tree } from './models/tree';

@Component({
  selector: 'app-tree-browser',
  templateUrl: './tree-browser.component.html',
  styleUrls: ['./tree-browser.component.css']
})
export class TreeBrowserComponent implements OnInit {

  trees:Tree[] = [];

  constructor(private treeService:TreeService) { }

  ngOnInit(): void {
    this.getUserTrees();
  }

  getUserTrees(){
    this.treeService.getUserTrees().subscribe(
      (data) => {
        this.trees = data;
        console.log(this.trees);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
