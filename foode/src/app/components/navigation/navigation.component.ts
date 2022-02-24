import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  cartCount!: number;
  authed = false;
  username!: string;
  usertype!: string;

  constructor(
    private readonly cartService: CartService,
    private readonly authService: AuthService,
    private readonly router: Router) { }

  initSession() {
    this.authed = true;
    this.username = this.authService.getCurrentUserName() || '';
    this.usertype = this.authService.getCurrentUserType() || '';
  }

  ngOnInit() {
    this.authService.$authed.subscribe((status) => {
      this.authed = status;
      if (this.authed) {
        this.initSession();
        this.cartService.getCart().subscribe(
          (data) => this.cartCount = data.length);
      }
    });
    
    if (!this.authService.getCurrentUser()) {
      if (this.router.url !== '/login' && this.router.url !== '/register') {
        this.router.navigate(['/login']);
      }
    } else {
      this.initSession();
      if (this.usertype === 'admin') {
        this.router.navigate(['/admin']);
      }
      this.cartService.$cart.subscribe((data) => this.cartCount = data.length);
      this.cartService.getCart().subscribe(
        (data) => this.cartCount = data.length);
    }
  }

  logout() {
    this.authService.logoutUser();
    this.authService.emitAuthState(false);
    this.router.navigate(['/login']);
  }

}
