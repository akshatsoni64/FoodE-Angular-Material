import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from 'src/app/models/food.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
      private readonly http: HttpClient,
      private readonly authService: AuthService) {}

  getFood(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.authService.$apiUrl}food/`);
  }

  addFood(food: Food): Observable<Food> {
    return this.http.post<Food>(`${this.authService.$apiUrl}food/`, food);
  }

  updateFood(id: number, food: Food): Observable<Food> {
    return this.http.put<Food>(`${this.authService.$apiUrl}food/${id}/`, food);
  }

  deleteFood(id: number) {
    return this.http.delete(`${this.authService.$apiUrl}food/${id}/`);
  }
}
