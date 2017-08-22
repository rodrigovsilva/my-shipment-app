import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { OrdersService } from '../../services/orders.service';
import { Order } from '../../model/order.model';

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
  orderIdForEdition: any;
  newOrder: Order;
  ordersSummary: any;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    console.log('this.filter', this.filter);
    this.filter = new Order;
    this.cancelOrderAdd();
    this.ordersService.getOrders(this.filter).subscribe(orders => {
      this.orders = orders;
      this.getOrdersSummary(this.orders);
      this.companies =  new Set(this.orders.map(order => order.companyName));
      this.addresses =  new Set(this.orders.map(order => order.customerAddress));
      console.log(this.filter, this.companies, this.addresses);
    });
  }

  onCompanySelect() {
    this.filter.customerAddress = '';
    this.ordersService.getOrders(this.filter).subscribe(orders => {
      this.orders = orders;
    });
  }

  onAddressSelect() {
    this.filter.companyName = '';
    this.ordersService.getOrders(this.filter).subscribe(orders => {
      this.orders = orders;
    });
  }

  editOrder(id) {
    this.orderIdForEdition = id;
  }

  saveOrder(order) {
    console.log('saveOrder', order);
    this.ordersService.updateOrder(order).subscribe(updatedOrder => {
      this.orderIdForEdition = '';
      this.ngOnInit();
      console.log('Order ' + updatedOrder.id + ' was updated successfully');
    });
  }

  deleteOrder(order) {
    this.ordersService.deleteOrder(order.id).subscribe(status => {

      if(status === 200) {
        console.log('Order ' + order.id + ' was updated successfully');
        this.ngOnInit();
      } else {
        console.log('Order ' + order.id + ' was not updated.');
      }

    });
  }

  addNewOrder() {
    this.newOrder = new Order();
    this.ordersService.getNextOrderId().subscribe(newOrderId => {
      this.newOrder.id = newOrderId;
      this.saveOrder(this.newOrder);
    });
  }

  addOrder(order) {
    console.log('addOrder', order);
    this.ordersService.addOrder(order).subscribe(newOrder => {
      this.cancelOrderAdd();
      this.ngOnInit();
      console.log('Order ' + newOrder.id + ' was updated successfully');
    });
  }

  cancelOrderAdd() {
    this.newOrder = null;
  }

  getOrdersSummary(orders) {
    const totalByItem = new Map<String, any>();

    this.orders.forEach(order => {
      if (totalByItem.get(order.orderedItem)) {
        totalByItem.set(order.orderedItem, totalByItem.get(order.orderedItem) + 1);
      } else {
        totalByItem.set(order.orderedItem, 1);
      }
    });

    const itemsByTotal = new Map<any, [any]>();
    totalByItem.forEach((val, key) => {
      if (itemsByTotal.get(val)) {
        const itemsName: [any] = itemsByTotal.get(val);
        itemsName.push(key);
        itemsByTotal.set(val, itemsName);
      } else {
        const itemsName: any = [];
        itemsName.push(key);
        itemsByTotal.set(val, itemsName);
      }
    });

    const summaryDetails = [];
    itemsByTotal.forEach((val, key) => {
      if (key === 1) {
        summaryDetails.push(key + 'x for the rest');
      } else {
        summaryDetails.push(key + 'x ' + val.sort().reverse().filter(function (curVal) {return curVal; }).join(' and '));
      }
    });


    this.ordersSummary = summaryDetails.sort().reverse().filter(function (val) {return val; }).join(', ');
    console.log('getOrdersSummary', this.ordersSummary);
  }
}

