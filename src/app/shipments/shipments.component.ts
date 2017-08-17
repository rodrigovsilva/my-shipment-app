import { Component, OnInit } from '@angular/core';
import { ShipmentsService } from '../shipments.service';
@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {

  allShipments: any = [];

  constructor(private shipmentsService: ShipmentsService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.shipmentsService.getAllShipments().subscribe(allShipments => {
      this.allShipments = allShipments;
    });
  }

}