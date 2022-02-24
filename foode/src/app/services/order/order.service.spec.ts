import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Order } from 'src/app/models/order.model';
import { AuthService } from '../auth/auth.service';

import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let htc: HttpTestingController;
  let authService: AuthService;
  let mockOrders = [{
    'id': 1644572468,
    'user': 1643868679,
    'cart': [{
      'id': 1644485415,
      'user': 1643868679,
      'food': {
        'id': 1643868649,
        'name': 'Mango',
        'description': 'The Mango Fruit, King of fruits ',
        'price': 65
      },
      'total_price': 60,
      'quantity': 1,
      'active': false
    }],
    'total_price': 60,
    'address': 'cdftyuhb',
    'created': '2022-02-11T09:41:08.836488Z'
  }];
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService, AuthService],
    });
    window.sessionStorage.setItem('userId', '1');
    service = TestBed.inject(OrderService);
    authService = TestBed.inject(AuthService);
    htc = TestBed.inject(HttpTestingController);
  });

  it('Instantiate Service', () => {
    expect(service).toBeTruthy();
  });

  

  it('should fetch Order[]', () => {
    let arrOrders!: Order[];
    service.getOrders().subscribe((res: Order[]) => {
      arrOrders = res;
      // console.log("arrOrders", res);
    });
    let results = {param: 'user', value: '1'};
    const requestOrders = htc.expectOne(
        `${authService.$apiUrl}order-details/?user=${results.value}`);
    expect(arrOrders).toBeFalsy();
    requestOrders.flush(mockOrders);
    expect(arrOrders.length).toBe(1);
  });
});
