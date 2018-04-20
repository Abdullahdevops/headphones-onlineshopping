import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    public authService: AuthService,
    public flashMessagesService: FlashMessagesService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  submitLogin() {
    this.authService.login(this.email, this.password)
    .then((res) => {
      this.flashMessagesService.show('You are logged in !', { cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/admin-panel/dashboard']);
    })
    .catch((err) => {
      this.flashMessagesService.show(err.message, { cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/admin-panel/login']);
    });
  }

}
