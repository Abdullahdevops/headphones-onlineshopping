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

  deleteAllProducts(){
    if(confirm("Are you sure?!")){
      this.productsService.deleteAllProducts();
      this.flashMessagesService.show("Producst deleted successfully", { cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/admin-panel/list-products']);
    }
  }

}
