import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
      private readonly router: Router,
      private readonly authService: AuthService) {}

  ngOnInit() {
    if (this.authService.getCurrentUserType() === 'admin') {
      this.router.navigate(['/admin']);
    }
  }
}
