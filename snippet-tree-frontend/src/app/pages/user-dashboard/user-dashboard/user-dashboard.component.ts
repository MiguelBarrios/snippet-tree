import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnippetDisplayComponent } from 'src/app/shared/components/snippet-display/snippet-display.component';
import { TreeDisplayComponent } from 'src/app/shared/components/tree-display/tree-display.component';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Tree } from '../tree-browser/models/tree';
import { TreeBrowserComponent } from '../tree-browser/tree-browser.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  treeDisplay:boolean = false;

  constructor(private route: ActivatedRoute, 
              private authService:AuthService,
              public cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    let user = new User();
    this.authService.login("lochnessbarrios", "password").subscribe(
      (data) => {
        // console.log("Crendentials saved");
        // console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  turnOnTreeDisplay(){
    this.treeDisplay = true;
    this.cd.detectChanges();
  }
}
