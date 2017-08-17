
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ShipmentsService {

  constructor(private http: Http) { }

  // Get all shipments from the API
  getAllShipments() {
    return this.http.get('/api/shipments')
      .map(res => res.json());
  }
}
