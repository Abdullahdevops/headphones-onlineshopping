import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../Product';
import { Order } from '../../order';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  id: string;
  product: Product = {
    name: '',
    country: '',
    price: 0
  };
  order: Order = {
    desiredQty: 1
  };

  isLoggedin;
  isUserLoggedin;

  orderQuantity;

  constructor(
    public productsService: ProductsService,
    public router: Router,
    public activatedRouter: ActivatedRoute,
    public authService: AuthService,
    public cartService: CartService,
    public flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.productsService.getProduct(this.id).subscribe(product => {
      this.product = product;
    });
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedin = true;
        this.isUserLoggedin = auth.email;
      } else {
        this.isLoggedin = false;
      }
    });
  }

  addToCart () {
    if (!this.isLoggedin) {
      this.flashMessagesService.show('Please Login First!', { cssClass: 'alert-info', timeout: 3000});
      this.router.navigate(['/signin']);
    }
    if (this.order.desiredQty < 1) {
      this.orderQuantity = true;
      this.flashMessagesService.show('Please select a value that is no less than 1!', { cssClass: 'alert-warning', timeout: 6000});
    } else {
      this.orderQuantity = false;
    }
  }

  goToCheckOut (userProduct) {
    if (this.product.quantity > this.order.desiredQty) {
      this.product.quantity -= this.order.desiredQty;
      userProduct = {
        productKey: this.product.$key,
        productName: this.product.name,
        productPrice: this.product.price,
        productQuantity: this.order.desiredQty,
        productPhoto: this.product.photo,
        total: this.order.desiredQty * this.product.price,
        userEmail: this.isUserLoggedin,
      };
      this.product = {
        quantity: this.product.quantity
      };
    this.productsService.updateProduct(this.id, this.product);
    this.cartService.addUserProducts(userProduct);
    this.flashMessagesService.show('Product Added To Your Cart!', { cssClass: 'alert-success', timeout: 3000});
    // this.router.navigate(['/cart']);
    } else {
      this.orderQuantity = this.product.quantity - 1;
      if (this.orderQuantity) {
      this.flashMessagesService.show('U can have at MAX ' + this.orderQuantity + ' Pieces', { cssClass: 'alert-danger', timeout: 3000});
      } else if (this.product.quantity = 1) {
      this.flashMessagesService.show('Sorry, Out Of Stock', { cssClass: 'alert-danger', timeout: 3000});
      }
    }
  }

}
