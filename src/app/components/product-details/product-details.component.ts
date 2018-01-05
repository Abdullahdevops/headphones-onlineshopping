import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../Product';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  id: string;
  product: Product;

  constructor(
    public productsService: ProductsService,
    public router: Router,
    public activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.productsService.getProduct(this.id).subscribe(product => {
      this.product = product;
    });
  }
}
