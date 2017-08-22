
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import Utils from '../utils/utils';

@Injectable()
export class OrdersService {

  constructor(private http: Http) { }

  getOrders(filter) {
    console.log('service.getOrders', filter);
      return this.http.post('/api/orders', filter)
      .map(res => res.json());
  }

  getOrder(id) {
    return this.http.get('/api/order/' + id)
      .map(res => res.json());
  }

  updateOrder(order) {
    return this.http.put('/api/order/' + order.id, order)
      .map(res => res.json());
  }

  deleteOrder(id) {
    return this.http.delete('/api/order/' + id)
      .map(res => res.status);
  }

  addOrder(order) {
    return this.http.post('/api/order/', order)
      .map(res => res.json());
  }

  getNextOrderId() {
    return this.getOrders(null).map(orders => {
      let newOrderId = Math.max.apply(Math, orders.map(order => order.id)) + 1;
      newOrderId = Utils.padLeft(newOrderId, 3, '0');
      return newOrderId;
    });
  }

}
