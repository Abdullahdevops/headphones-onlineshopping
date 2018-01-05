import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedin: boolean;
  isUserLoggedin: string;

  constructor(
    public authService: AuthService,
    public flashMessagesService: FlashMessagesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedin = true;
        this.isUserLoggedin = auth.email;
      } else {
        this.isLoggedin = false;
      }
    });
  }

  logoutClick() {
    this.authService.logout();
    this.flashMessagesService.show('You are logged out !', { cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/admin-panel/login']);
  }

}
