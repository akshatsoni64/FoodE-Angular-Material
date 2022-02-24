import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DelFoodComponent } from './del-food.component';

describe('DelFoodComponent', () => {
  let component: DelFoodComponent;
  let fixture: ComponentFixture<DelFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelFoodComponent],

      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Instantiate Component', () => {
    expect(component).toBeTruthy();
  });
});
