import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Favourite } from 'src/app/models/favourite.model';
import { AuthService } from '../auth/auth.service';

import { FavouriteService } from './favourite.service';

describe('FavouriteService', () => {
  let service: FavouriteService;
  let authService: AuthService;

  let htc: HttpTestingController;
  let mockFavourites = [{
    'id': 1644486898,
    'user': 1643868679,
    'food': { 'id': 1643868649, 'name': 'Mango' }
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FavouriteService, AuthService],
    });
    window.sessionStorage.setItem('userId', '1');
    service = TestBed.inject(FavouriteService);
    authService = TestBed.inject(AuthService);
    htc = TestBed.inject(HttpTestingController);
  });

  it('Instantiate Service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch Favourites[]', () => {
    let arrFavourites!: Favourite[];
    service.getFavorites().subscribe((res: Favourite[]) => {
      arrFavourites = res;
      // console.log("arrFavourites", res);
    });
    let results = { param: 'user', value: '1' };
    const requestFavourite = htc.expectOne(
      `${authService.$apiUrl}fav-details/?user=${results.value}`);
    expect(arrFavourites).toBeFalsy();
    requestFavourite.flush(mockFavourites);
    expect(arrFavourites.length).toBe(1);
  });
});
