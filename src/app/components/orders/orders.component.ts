import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
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

  displayedColumns = ['orderId', 'companyName', 'customerAddress', 'orderedItem'];
 
  datasource: any = [];

  constructor(private ordersService: OrdersService) { }

  ordersDatabase = new OrdersDatabase(this.ordersService);
  dataSource: OrdersDataSource | null;

  ngOnInit() {
    this.dataSource = new OrdersDataSource(this.ordersDatabase);
  }
}

export interface Order {
  orderId: string;
  companyName: string;
  customerAddress: string;
  orderedItem: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class OrdersDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  get data(): Order[] { return this.dataChange.value; }

  constructor(private ordersService: OrdersService) {
    // Retrieve posts from the API
    this.ordersService.getAllOrders().subscribe(orders => {
      console.log('orders', orders);
      this.dataChange.next(orders);
    });
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class OrdersDataSource extends DataSource<any> {
  constructor(private _ordersDatabase: OrdersDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Order[]> {
    return this._ordersDatabase.dataChange;
  }

  disconnect() {}
}