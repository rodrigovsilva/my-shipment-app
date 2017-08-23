import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { OrdersService } from './orders.service';
import { OrdersComponent } from '../components/orders/orders.component';
import { Order } from '../model/order.model';

describe('OrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersService]
    });
  });

  it('should be created', inject([OrdersService], (service: OrdersService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all orders', inject([OrdersService], (service: OrdersService) => {
    expect(service.getOrders(null)).toBeTruthy();
  }));

  it('should get orders by company name', inject([OrdersService], (service: OrdersService) => {
    const filter = new Order();
    filter.companyName = 'SuperTrader';
    expect(service.getOrders(filter)).toBeTruthy();
  }));

  it('should get orders by customer address', inject([OrdersService], (service: OrdersService) => {
    const filter = new Order();
    filter.customerAddress = 'Reeperbahn 153';
    expect(service.getOrders(filter)).toBeTruthy();
  }));

  it('should create an order ', inject([OrdersService], (service: OrdersService) => {
    const order = new Order();
    order.companyName = 'Company Name Test';
    order.customerAddress = 'Customer Address Test';
    order.orderedItem = 'Item Test';

    service.getNextOrderId().subscribe(newOrderId => {
      order.id = newOrderId;
      service.addOrder(this.order);
      expect(service.getOrder(this.order.id)).toBeTruthy();
    });

  }));

  it('should update an order ', inject([OrdersService], (service: OrdersService) => {
    const order = new Order();
    order.id = '001';
    order.companyName = 'Company Name Test';

    service.updateOrder(this.order);

    service.getOrder(this.order.id).subscribe(updatedOrder => {
      expect(order.companyName === updatedOrder.companyName).toBeTruthy();
    });
  }));

  it('should delete an order ', inject([OrdersService], (service: OrdersService) => {
    const order = new Order();
    order.id = '001';

    service.deleteOrder(order.id);

    expect(service.getOrder(order.id)).toBeUndefined();
  }));

});
