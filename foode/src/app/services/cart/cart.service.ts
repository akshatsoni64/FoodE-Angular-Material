import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { Food } from 'src/app/models/food.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  $cart: EventEmitter<Cart[]> = new EventEmitter;

  constructor(
      private readonly http: HttpClient,
      private readonly authService: AuthService) {}

  getCart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(
        `${this.authService.$apiUrl}cart-details/?user=${
            this.authService.getCurrentUser()}&active=true`);
  }

  emitCart() {
    this.getCart().subscribe((data) => {
      this.$cart.emit(data);
    });
  }

  createCart(food: Food): Observable<Cart> {
    const cart = {
      user: this.authService.getCurrentUser(),
      food: food.id,
      quantity: 1,
      total_price: food.price
    };
    return this.http.post<Cart>(`${this.authService.$apiUrl}cart/`, cart);
  }

  updateCartQuantity(item: Cart) {
    return this.http.put(
        `${this.authService.$apiUrl}cart/${item.id}/`,
        {'quantity': item.quantity, 'total_price': item.total_price});
  }

  deleteCart(id: number) {
    return this.http.delete(`${this.authService.$apiUrl}cart/${id}/`);
  }
}
