import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { Cart } from 'src/app/models/cart.model';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let app: any;
  let mockCart: Cart[] = [
    {
      'id': 1644577181,
      'food': { 'id': 1643868649, 'name': 'Mango', 'description': "Mango Fruit", 'price': 65 },
      'quantity': 1,
      'total_price': 65,
      'user': 1643868679
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers:[
        {provide: MatSnackBar, useValue:{}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    app = fixture.debugElement.nativeElement;
  });

  it('Instantiate Component', () => {
    expect(component).toBeTruthy();
  });
  
  it('Component Title = "Your Cart"', () => {
    expect(app.querySelector('h1').textContent).toEqual('Your Cart');
  });
  
  it('Empty Cart', () => {
    expect(app.querySelector('h3').textContent).toEqual('No items added found in cart');
  });
  
  it('Non-Empty Cart', () => {
    component.cart = mockCart;
    component.cartCount = mockCart.length;
    
    fixture.detectChanges();
    app = fixture.debugElement.nativeElement;
    
    expect(app.querySelector('h3')).toBeFalsy();
    expect(component.cartCount).toBe(component.cart.length);
  });
  
  it('Cart Item Quantity = 1', () => {
    expect(app.querySelector('button#reduceQuant')).toBeFalsy();
  });
  
  it('Cart Item Quantity > 1', () => {
    mockCart[0]['quantity'] = 2;
    component.cart = mockCart;
    component.cartCount = mockCart.length;
    fixture.detectChanges();
    app = fixture.debugElement.nativeElement;
    expect(app.querySelector('button#reduceQuant')).toBeTruthy();
  });
});
