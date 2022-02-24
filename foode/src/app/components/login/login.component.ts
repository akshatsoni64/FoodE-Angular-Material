import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(
      private readonly authService: AuthService,
      private readonly snackbar: MatSnackBar, private readonly router: Router) {
  }

  ngOnInit() {
    if (this.authService.getCurrentUser()) {
      this.router.navigate(['']);
    }
  }

  login() {
    this.authService.authenticateUser(this.loginForm.value.username)
        .subscribe((data) => {
          if (data.length > 0) {
            // console.log(data[0]);
            if (data[0].password === this.loginForm.value.password) {
              this.snackbar.open(
                  'Login Successful, Redirecting to Home Page', '',
                  {duration: 2000});
              this.authService.loginUser(data[0]);
              this.authService.emitAuthState(true);
              this.router.navigate(['']);
            }
          } else {
            // const sbref =
            this.snackbar.openFromComponent(LoginError, {duration: 2000});

            // sbref.afterDismissed().subscribe((res) => {});
          }
        });
  }
}


@Component({
  selector: 'login-error',
  template: `
    <span>Invalid Credentials, Please try again!
  `,
  styles: [
    `
    span {
      color: #d45353;
    }
  `,
  ],
})
export class LoginError {
}