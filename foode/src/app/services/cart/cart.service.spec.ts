import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Cart } from 'src/app/models/cart.model';
import { Food } from 'src/app/models/food.model';
import { AuthService } from '../auth/auth.service';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let htc: HttpTestingController;
  let authService: AuthService;

  let mockCart: Cart[] = [
    {
      'id': 1644577183,
      'user': 1643868679,
      'food': { 'id': 1643868442, 'description': "Guava Fruit", 'name': 'Guava', 'price': 45 },
      'total_price': 45,
      'quantity': 1
    },
    {
      'id': 1644577181,
      'user': 1643868679,
      'food': { 'id': 1643868649, 'name': 'Mango', 'description': "Mango Fruit", 'price': 65 },
      'total_price': 65,
      'quantity': 1
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService, AuthService],
    });
    window.sessionStorage.setItem('userId', '1');
    service = TestBed.inject(CartService);
    authService = TestBed.inject(AuthService);
    htc = TestBed.inject(HttpTestingController);
  });

  it('Instantiate Service', () => {
    expect(service).toBeTruthy();
  });

  it('Fetch Cart[]', () => {
    let arrCart!: Cart[];
    service.getCart().subscribe((res: Cart[]) => {
      arrCart = res;
      // console.log("arrCart", res);
    });
    const results = { param: 'user', value: '1' };
    let url: string = `${authService.$apiUrl}cart-details/?${results.param}=${results.value}&active=${true}`;

    const requestCart = htc.expectOne(url);
    expect(arrCart).toBeFalsy();
    requestCart.flush(mockCart);
    expect(arrCart.length).toBe(2);
  });

  it("Add Cart Item", ()=>{
    let ob: Food = {
      "id": 3,
      "name": "Banana",
      "description": "Banana Fruit",
      "price": 50
    }
  });
});
