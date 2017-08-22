import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:  any = [];
  companies:  any = [];
  addresses:  any = [];
  filter: Order;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    console.log('this.filter', this.filter);
    this.filter = new Order;
    this.ordersService.getOrders(this.filter).subscribe(orders => {
      this.orders = orders;
      this.companies =  new Set(this.orders.map(order => order.companyName));
      this.addresses =  new Set(this.orders.map(order => order.customerAddress));
      console.log(this.filter, this.companies, this.addresses);
    });
  }

  onCompanySelect(){
    this.filter.customerAddress = '';
    this.ordersService.getOrders(this.filter).subscribe(orders => {
      this.orders = orders;
    });
  }

  onAddressSelect(){
    this.filter.companyName = '';
    this.ordersService.getOrders(this.filter).subscribe(orders => {
      this.orders = orders;
    });
  }
}

export class Order {
  id: string;
  companyName: string;
  customerAddress: string;
  orderedItem: string;

  constructor() { 
    this.companyName = '';
    this.customerAddress = '';
  }
}
