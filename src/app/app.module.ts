import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ShipmentsComponent } from './shipments/shipments.component';

import { ShipmentsService } from './shipments.service';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'shipments',
    pathMatch: 'full'
  },
  {
    path: 'shipments',
    component: ShipmentsComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    ShipmentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [ShipmentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
