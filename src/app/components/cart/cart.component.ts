import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cart } from '../../Cart';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Cart[];

  constructor(public cartService: CartService, public router: Router,
    public activatedRouter: ActivatedRoute, public flashMessagesService: FlashMessagesService) {
  }

  ngOnInit() {
    this.cartService.getUserProducts().subscribe(items => {
      this.cart = items;
    });
  }

}
