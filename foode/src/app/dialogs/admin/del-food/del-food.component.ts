import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-del-food',
  templateUrl: './del-food.component.html',
  styleUrls: ['./del-food.component.css']
})
export class DelFoodComponent {
  foodId!: number;

  constructor(
      public dialogRef: MatDialogRef<DelFoodComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    this.foodId = data['foodId'];
    // console.log(this.foodId, 'Initialized');
  }

  deleteFooditem() {
    this.dialogRef.close({event: 'delete', foodId: this.foodId});
  }

}
