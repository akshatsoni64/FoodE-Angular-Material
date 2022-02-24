import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Food } from 'src/app/models/food.model';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;
  let htc: HttpTestingController;
  let mockfood: Food[] = [
    {
      "id": 1,
      "name": "Mango",
      "description": "Mango Fruit",
      "price": 40,
      "isFav": true,
      "favId": 2
    },
    {
      "id": 2,
      "name": "Guava",
      "description": "Guava Fruit",
      "price": 30,
      "inCart": true,
      "cartId": 4,
      "isFav": true,
      "favId": 1
    },
    {
      "id": 3,
      "name": "Banana",
      "description": "Banana Fruit",
      "price": 50
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MenuService,
      ],
    });

    service = TestBed.inject(MenuService);
    htc = TestBed.inject(HttpTestingController);
  });

  it('Instantiate Service', () => {
    expect(service).toBeTruthy();
  });
});
