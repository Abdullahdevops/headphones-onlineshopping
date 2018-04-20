import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;

  constructor(public authService: AuthService,
    public flashMessagesService: FlashMessagesService,
    public router: Router) { }

  ngOnInit() {
  }

  submitRegister() {
    this.authService.register(this.email, this.password)
      .then((res) => {
        this.flashMessagesService.show('Registed successfully !', { cssClass: 'alert-success', timeout: 6000});
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.flashMessagesService.show(err.message, { cssClass: 'alert-danger'});
        this.router.navigate(['/register']);
      });
  }

}
