import { Component, OnInit } from '@angular/core';
import { Tree } from 'src/app/pages/user-dashboard/tree-browser/models/tree';

@Component({
  selector: 'app-tree-display',
  templateUrl: './tree-display.component.html',
  styleUrls: ['./tree-display.component.css']
})
export class TreeDisplayComponent implements OnInit {

  treeName:string = "Tree Display";
  selectedTree:Tree | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  loadTree(tree:Tree){
    let header = document.getElementById("treeDisplayHeader");
    if(header){
      header.textContent = tree.treename;
    }
  }
}
