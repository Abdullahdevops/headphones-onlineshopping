import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../Product';
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  id: string;
  product: Product ={
    name:"",
    country:"",
    price:0
  };

  constructor(
    public productsService: ProductsService,
    public router: Router,
    public activatedRouter: ActivatedRoute,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.productsService.getProduct(this.id).subscribe(product=>{
      this.product =product;
    });
  }

  updateProduct({value, valid}: {value: Product, valid: boolean}) {
    if(!valid){
      this.flashMessagesService.show('Please enter valid info', { cssClass: 'alert-danger'});
      this.router.navigate(['/edit-product/' + this.id]);
    } else {
      this.productsService.updateProduct(this.id, value);
      this.flashMessagesService.show('Employee updated successfully', { cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/product/' + this.id]);
    }
  }

}
