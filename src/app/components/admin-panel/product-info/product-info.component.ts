import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../Product';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  id: string;
  product: Product;

  constructor(
    public productsService: ProductsService,
    public router: Router,
    public activatedRouter: ActivatedRoute,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.productsService.getProduct(this.id).subscribe(product => {
      this.product = product;
    });
  }

  deleteProduct() {
    if (confirm('Are you sure?!')) {
      this.productsService.deleteProduct(this.id);
      this.flashMessagesService.show('Product deleted successfully', { cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/admin-panel/list-products']);
    }
  }
}
