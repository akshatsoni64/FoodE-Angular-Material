import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Food } from 'src/app/models/food.model';

import { MenuComponent } from './menu.component';

describe('Empty Menu Component Tests', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let app: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatSnackBar, useValue: {} },
        { provide: MatDialog, useValue: {} }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    app = fixture.debugElement.nativeElement;
  });

  it('Instantiate Component', () => {
    expect(component).toBeTruthy();
  });

  it('Component Title = "Menu"', () => {
    expect(app.querySelector('h1').textContent).toBe("Menu");
  });

  it('Empty Menu', () => {
    expect(app.querySelector('p').textContent).toBe("No Food available at this time! Please check back later.");
  });
});

describe('Non-Empty Menu Component Tests', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let app: any;
  let mockfood: Food[] = [
    {
      "id": 1,
      "name": "Mango",
      "description": "Mango Fruit",
      "price": 40,
      "isFav": true,
      "favId": 2
    },
    // {
    //   "id": 2,
    //   "name": "Guava",
    //   "description": "Guava Fruit",
    //   "price": 30,
    //   "inCart": true,
    //   "cartId": 4,
    //   "isFav": true,
    //   "favId": 1
    // },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatSnackBar, useValue: {} },
        { provide: MatDialog, useValue: {} }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;

    component.food = mockfood;
    component.foodCount = mockfood.length;

    fixture.detectChanges();
    app = fixture.debugElement.nativeElement;

    // console.log(app);
  });

  it('Non-Empty Menu', () => {
    expect(app.querySelector('p#no_food')).toBeFalsy();
    expect(app.querySelector('div.food-card')).toBeTruthy();
  });

  it('Favourite & In-Cart Item', () => {
    // console.log('Favourite & In-Cart Item', app);
    expect(app.querySelector('button#delFav')).toBeTruthy();
    expect(app.querySelector('button#deleteCart')).toBeFalsy();
  });

  it('Add-2-Favourite & Add-2-Cart Item', () => {
    // console.log('Add-2-Favourite & Add-2-Cart Item', app);
    expect(app.querySelector('button#addCart')).toBeTruthy();
    expect(app.querySelector('button#addFav')).toBeFalsy();
  });

  // it('Add-2-Cart Operation', ()=>{
  //   let ob: Food = {
  //     "id": 3,
  //     "name": "Banana",
  //     "description": "Banana Fruit",
  //     "price": 50
  //   };

  // });
});
