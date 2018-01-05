import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../Product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  products: Product[];

  constructor(public productsService: ProductsService) { 
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  ngOnInit() {
  }

}
