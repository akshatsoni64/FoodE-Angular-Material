import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart!: Cart[];
  cartCount!: number;
  address!: string;
  constructor(
      private readonly cartService: CartService,
      private readonly orderService: OrderService,
      private readonly router: Router,
      private readonly snackbar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((data) => {
      this.cart = data;
      this.cartCount = data.length;
    });
    this.cartService.$cart.subscribe((data) => {
      this.cart = data;
      this.cartCount = data.length;
    });
  }

  getOrderTotal(): number {
    let sum: number = this.cart.map(a => a.total_price).reduce((a, b) => a + b);
    return sum;
  }

  getQuantity(): number {
    let sum: number = this.cart.map(a => a.quantity).reduce((a, b) => a + b);
    return sum;
  }

  updateQuantity(item: Cart) {
    this.cartService.updateCartQuantity(item).subscribe();
  }

  placeOrder() {
    this.orderService.createOrder(this.getOrderTotal(), this.cart, this.address)
        .subscribe((data) => {
          const sbref = this.snackbar.open(
              'Order Placed Successfully', 'See Orders', {duration: 2000});

          sbref.afterDismissed().subscribe((res) => {
            this.cartService.emitCart();
            this.router.navigate(['orders']);
          });
        });
  }
}
