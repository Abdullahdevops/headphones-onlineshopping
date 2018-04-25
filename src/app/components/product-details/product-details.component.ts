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
  product: Product;
  order: Order = {
    desiredQty: 1
  };

  isLoggedin;
  isUserLoggedin;

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
      this.flashMessagesService.show('please login first!', { cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/signin']);
    }
  }

  goToCheckOut (userProduct) {
    userProduct = {
      productKey: this.product.$key,
      productName: this.product.name,
      productPrice: this.product.price,
      productQuantity: this.order.desiredQty,
      productPhoto: this.product.photo,
      total: this.order.desiredQty * this.product.price,
      userEmail: this.isUserLoggedin,
    };
    this.cartService.addUserProducts(userProduct);
    this.flashMessagesService.show('product added succefully!', { cssClass: 'alert-success', timeout: 3000});
    console.log(userProduct);
    // this.router.navigate(['/cart']);
  }

}
