import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService:AuthService) { }

  ngOnInit(): void {
    let user = new User();
    this.authService.login("lochnessbarrios", "password").subscribe(
      (data) => {
        console.log("Crendentials saved");
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
