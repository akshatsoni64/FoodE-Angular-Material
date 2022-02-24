import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        AuthService,
        {provide: MatSnackBar, useValue: {}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Instantiate Component', () => {
    expect(component).toBeTruthy();
  });
  
  it('component title = "Login"', () => {
    const comp = TestBed.createComponent(LoginComponent);
    let app = comp.debugElement.nativeElement;
    expect(app.querySelector('h1').textContent).toEqual('Login');
  });
});
