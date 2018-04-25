import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cart } from '../../Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Cart[];

  constructor(public cartService: CartService, public flashMessagesService: FlashMessagesService) {
  }

  ngOnInit() {
    this.cartService.getUserProducts().subscribe(items => {
      this.cart = items;
    });
  }

}
