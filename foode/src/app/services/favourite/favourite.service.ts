import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favourite } from 'src/app/models/favourite.model';
import { Food } from 'src/app/models/food.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  constructor(
      private readonly http: HttpClient,
      private readonly authService: AuthService) {}

  getFavorites(): Observable<Favourite[]> {
    return this.http.get<Favourite[]>(
        `${this.authService.$apiUrl}fav-details/?user=${
            this.authService.getCurrentUser()}`);
  }

  createFavourite(item: Food): Observable<Favourite> {
    const fav = {'user': this.authService.getCurrentUser(), food: item.id};
    return this.http.post<Favourite>(
        `${this.authService.$apiUrl}favourite/`, fav);
  }

  deleteFavourite(id: number) {
    return this.http.delete(`${this.authService.$apiUrl}favourite/${id}/`);
  }
}
