import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs';
import { Product } from '../Product';

@Injectable()
export class ProductsService {

  products: FirebaseListObservable<any[]>;
  product: FirebaseObjectObservable<any>;

  constructor(public db: AngularFireDatabase) {
    this.products = this.db.list('/products') as FirebaseListObservable<Product[]>;
  }

  getProducts() {
    return this.products;
  }

  addProduct(product: Product) {
    return this.products.push(product);
  }

  getProduct(id: string) {
    this.product = this.db.object('/products/' + id) as FirebaseObjectObservable<Product>;
    return this.product;
  }

  updateProduct(id: string, product: Product) {
    return this.products.update(id, product);
  }

  deleteProduct(id: string) {
    return this.products.remove(id);
  }

  deleteAllProducts() {
    return this.products.remove();
  }

}
