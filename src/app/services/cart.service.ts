import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { Cart } from '../Cart';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class CartService {

  carts: FirebaseListObservable<any[]>;
  cart: FirebaseObjectObservable<any>;
  isUserLoggedin;

  constructor(public db: AngularFireDatabase, public authService: AuthService, public router: Router,
    public activatedRouter: ActivatedRoute) {
    this.carts = this.db.list('/carts') as FirebaseListObservable<Cart[]>;
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isUserLoggedin = auth.email;
      }
    });
  }

  addUserProducts(cart: Cart) {
    return this.carts.push(cart);
  }

  getUserProducts() {
    this.carts = this.db.list('/carts', { query: {
      orderByChild: 'userEmail',
      equalTo: this.isUserLoggedin
    }});
    return this.carts;
  }

  deleteUserProduct(id) {
    return this.carts.remove(id);
  }

}
