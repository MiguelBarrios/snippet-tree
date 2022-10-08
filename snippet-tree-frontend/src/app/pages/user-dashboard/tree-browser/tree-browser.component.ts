import { Component, OnInit } from '@angular/core';
import { TreeService } from 'src/app/shared/services/tree.service';

@Component({
  selector: 'app-tree-browser',
  templateUrl: './tree-browser.component.html',
  styleUrls: ['./tree-browser.component.css']
})
export class TreeBrowserComponent implements OnInit {

  constructor(private treeService:TreeService) { }

  ngOnInit(): void {
    this.getUserTrees();
  }

  getUserTrees(){
    this.treeService.getUserTrees().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
