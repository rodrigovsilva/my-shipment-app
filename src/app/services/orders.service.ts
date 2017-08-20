
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrdersService {

  constructor(private http: Http) { }

  getAllOrders() {
    console.log('orders');
    return this.http.get('/api/orders')
      .map(res => res.json());
  }
}
