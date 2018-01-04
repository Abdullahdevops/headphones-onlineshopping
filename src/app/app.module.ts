import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { FeaturesComponent } from './components/features/features.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AddProductComponent } from './components/admin-panel/add-product/add-product.component';
import { ProductInfoComponent } from './components/admin-panel/product-info/product-info.component';
import { DashboardComponent } from './components/admin-panel/dashboard/dashboard.component';
import { ListProductsComponent } from './components/admin-panel/list-products/list-products.component';
import { LoginComponent } from './components/admin-panel/login/login.component';

import { ProductsService } from './services/products.service';
import { AuthService } from './services/auth.service';

export const firebaseConfig = {
  apiKey: "AIzaSyBrtlnRJMHelhlBEANHZb3IC3zpkMcvNgY",
  authDomain: "headphones-6a918.firebaseapp.com",
  databaseURL: "https://headphones-6a918.firebaseio.com",
  projectId: "headphones-6a918",
  storageBucket: "headphones-6a918.appspot.com",
  messagingSenderId: "631364083549"
};

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'admin-panel/login', component: LoginComponent},
  {path: 'admin-panel/dashboard', component: LoginComponent},
  {path: 'admin-panel/addproduct', component: AddProductComponent},
  {path: 'admin-panel/product-info', component: ProductInfoComponent},
  {path: 'admin-panel/list-product', component: ListProductsComponent},
  {path: 'product/:id', component: ProductInfoComponent},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HeaderComponent,
    SliderComponent,
    FeaturesComponent,
    ContactComponent,
    FooterComponent,
    ProductsComponent,
    PagenotfoundComponent,
    AddProductComponent,
    ProductInfoComponent,
    DashboardComponent,
    ListProductsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ProductsService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
