import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  email: string;
  password: string;

  constructor( public authService: AuthService,
    public flashMessagesService: FlashMessagesService,
    private _location: Location,
    public router: Router) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.login(this.email, this.password)
    .then((res) => {
      this.flashMessagesService.show('You are logged in !', { cssClass: 'alert-success', timeout: 3000});
      this._location.back();
    })
    .catch((err) => {
      this.flashMessagesService.show(err.message, { cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['signin']);
    });
  }

}
