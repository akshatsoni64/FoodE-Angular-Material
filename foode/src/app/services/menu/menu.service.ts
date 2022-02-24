import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from 'src/app/models/food.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(
      private readonly http: HttpClient,
      private readonly authService: AuthService) {}

  getFoodItems(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.authService.$apiUrl}menu/?user=${
        this.authService.getCurrentUser()}`);
  }
}
