import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './material/material.imports';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './components/admin/admin.component';
import { AddFoodComponent } from './dialogs/admin/add-food/add-food.component';
import { DelFoodComponent } from './dialogs/admin/del-food/del-food.component';
import { DelCartComponent } from './dialogs/cart/del-cart/del-cart.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

let components = [
  AppComponent,
  AdminComponent,
  AddFoodComponent,
  DelFoodComponent,
  DelCartComponent,
  NavigationComponent,
  LoginComponent,
  RegisterComponent,
  MenuComponent,
  HomeComponent,
  CartComponent,
  OrderComponent,
  FavouriteComponent,
  NavigationComponent
]

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, MaterialModule,
    ReactiveFormsModule, FormsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: components
})
export class AppModule { }
