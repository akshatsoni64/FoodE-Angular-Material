import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Food } from 'src/app/models/food.model';
import { AuthService } from '../auth/auth.service';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let authService: AuthService;
  let htc: HttpTestingController;
  let mockFood = [
    {
      'id': 1643868442,
      'name': 'Guava',
      'description': 'The Guava Fruit, fresh export quality fruit',
      'price': 45
    },
    {
      'id': 1643868649,
      'name': 'Mango',
      'description': 'The Mango Fruit, King of fruits ',
      'price': 65
    },
    {
      'id': 1644481227,
      'name': 'Apple',
      'description': 'Fresh Apple, Export quality apple fruit',
      'price': 80
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService, AuthService],
    });
    service = TestBed.inject(AdminService);
    authService = TestBed.inject(AuthService);
    htc = TestBed.inject(HttpTestingController);
  });

  it('Instantiate Service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch Food[]', () => {
    let arrFood!: Food[];
    service.getFood().subscribe((res: Food[]) => {
      arrFood = res;
    });

    const requestFood = htc.expectOne(`${authService.$apiUrl}food/`);
    expect(arrFood).toBeFalsy();
    requestFood.flush(mockFood);
    expect(arrFood.length).toBe(3);
  });
});
