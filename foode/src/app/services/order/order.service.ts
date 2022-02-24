import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { Order } from 'src/app/models/order.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
      private readonly http: HttpClient,
      private readonly authService: AuthService) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
        `${this.authService.$apiUrl}order-details/?user=${
            this.authService.getCurrentUser()}`);
  }

  createOrder(price: number, cart: Cart[], address: string): Observable<Order> {
    const order = {
      'total_price': price,
      'address': address,
      'cart': cart.map(a => a.id),
      'user': this.authService.getCurrentUser(),
    };
    return this.http.post<Order>(`${this.authService.$apiUrl}order/`, order);
  }
}
