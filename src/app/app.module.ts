import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';

import { OrdersService } from './services/orders.service';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    component: OrdersComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
