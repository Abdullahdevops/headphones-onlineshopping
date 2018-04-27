import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cart } from '../../Cart';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Cart[];
  product: Product = {
    name: '',
    country: '',
    price: 0
  };

  constructor(public cartService: CartService, public productsService: ProductsService, public flashMessagesService: FlashMessagesService) {
  }

  ngOnInit() {
    this.cartService.getUserProducts().subscribe(items => {
      this.cart = items;
    });
  }

  deleteProduct (key, qty, id) {
    if ( this.cartService.deleteUserProduct(key) ) {
      this.flashMessagesService.show('Product Removed From Your Cart!', { cssClass: 'alert-info', timeout: 3000});
      /* this.productsService.getProduct(id).subscribe(product => {
        this.product = product;
        this.product.quantity = this.product.quantity + qty;
        this.product = {
          quantity: this.product.quantity
        };
        this.productsService.updateProduct(id, this.product);
      }); */
    }
  }
}
