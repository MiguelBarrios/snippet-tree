import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  closeResult = '';

  loginError = false;

  loggedin:boolean = false;

  loginUser: User = new User();

  newUser: User = new User();


  constructor(private router: Router, private authService:AuthService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loggedin = this.authService.checkLogin();
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  login(user:User){
    this.authService.login(user.username, user.password).subscribe(
      {
          next: (loggedinUser) => {
            this.router.navigateByUrl('/user-dashboard');
            this.loginUser = new User();
            this.loggedin = true;
            this.modalService.dismissAll();
            this.loginError = false;
          },
          error: () => {
            console.error('loginFailed');
            this.loginError = true;
          }
      }
    )
  }

  loggedIn():boolean{
    this.loggedin = this.authService.checkLogin();
    return this.loggedin;
  }

  register(user: User): void {
    console.log('Registering user:');
    console.log(user);
    this.authService.register(user).subscribe({
      next: (registeredUser) => {
        this.authService.login(user.username, user.password).subscribe({
          next: (loggedInUser) => {
            this.router.navigateByUrl('/user-dashboard');
            this.newUser = new User();
            this.loggedin = true;
          },
          error: (problem) => {
            console.error('RegisterComponent.register(): Error logging in user:');
            console.error(problem);
          }
        });
      },
      error: (fail) => {
        console.error('RegisterComponent.register(): Error registering account');
        console.error(fail);
      }
    });
  }

  logout(){
    this.authService.logout();
    this.loggedin = false;
}
}