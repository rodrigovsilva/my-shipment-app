import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  allOrders: any = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.ordersService.getAllOrders().subscribe(orders => {
      console.log('orders', orders);
      this.allOrders = orders;
    });
  }
}
