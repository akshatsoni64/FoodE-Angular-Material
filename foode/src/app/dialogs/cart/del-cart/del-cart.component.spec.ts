import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { DelCartComponent } from './del-cart.component';

describe('DelCartComponent', () => {
  let component: DelCartComponent;
  let fixture: ComponentFixture<DelCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
      ],
      declarations: [ DelCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Instantiate Component', () => {
    expect(component).toBeTruthy();
  });
});
