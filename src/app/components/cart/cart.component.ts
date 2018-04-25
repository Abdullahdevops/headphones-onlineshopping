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
  id;

  constructor(public cartService: CartService,public router: Router,
    public activatedRouter: ActivatedRoute, public flashMessagesService: FlashMessagesService) {
  }

  ngOnInit() {
    this.cartService.getUserProducts().subscribe(items => {
      this.cart = items;
    });
    this.id = this.activatedRouter.snapshot.params['id'];
    this.cartService.getUserProduct(this.id).subscribe(cart => {
      this.cart = cart;
    });
  }

  deleteProduct() {
    if (confirm('Are you sure?!')) {
      this.cartService.deleteUserProduct(this.id);
      this.flashMessagesService.show('Product deleted successfully', { cssClass: 'alert-success', timeout: 3000});
    }
  }
}
