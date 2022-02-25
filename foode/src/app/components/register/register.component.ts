import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    type: new FormControl('user', Validators.required),
  });

  constructor(
      private readonly authService: AuthService,
      private readonly router: Router, private readonly snackbar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.authService.getCurrentUser()) {
      this.router.navigate(['']);
    }
  }

  register() {
    if (!this.regForm.valid) {
      this.snackbar.open(
          'Invalid Request, Please try again!', '', {duration: 2000});
    } else {
      const cred = this.regForm.value;
      // console.log(cred);
      // console.log(this.regForm);
      this.authService.createUser(cred.username, cred.password, cred.type)
          .subscribe((data) => {
            this.authService.loginUser(data);
            this.authService.emitAuthState(true);
            this.snackbar.open(
                'Registration Successful, Logging In', '', {duration: 2000});
            this.router.navigate(['']);
          });
    }
  }

}
