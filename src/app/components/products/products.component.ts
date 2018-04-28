import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../Product';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  itemPrice;

  @Input('likesCount') likesCount = 0;
  @Input('isActive') isActive = false;

  constructor(public productsService: ProductsService, public flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  search(itemPrice) {
    const val = itemPrice;
    if ( val.trim() === '') {
      return this.products;
    }
    if (val && val.trim() !== '') {
      this.products = this.products.filter((item) => {
        if (item.price >= itemPrice && item.quantity > 1) {
          return true;
        }
      });
    }
    return this.products ;
  }

  rating (id) {
    this.isActive = !this.isActive;
    this.likesCount += (this.isActive) ? 1 : -1;
    this.productsService.getProduct(id).update({
      rate: this.likesCount
    });
  }

  /* filter (itemPrice) {
    this.products.forEach(item => {
      if (item.price >= itemPrice) {
        // this.products = [];
        this.result.push(item);
        console.log(this.result);
      }
    });
    console.log(itemPrice);
  } */

}
