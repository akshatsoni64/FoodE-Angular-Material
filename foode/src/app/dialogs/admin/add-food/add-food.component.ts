import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Food } from 'src/app/models/food.model';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent {
  
  foodForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.min(1))
  });
  updateId!: number;

  dialogMessage!: string;

  constructor(
      private readonly adminService: AdminService,
      public dialogRef: MatDialogRef<AddFoodComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private readonly snackbar: MatSnackBar) {
    if (data.food != null) {
      this.updateId = data.food.id;
      this.foodForm.setValue({
        name: data.food.name,
        description: data.food.description,
        price: data.food.price
      });
    }
    this.dialogMessage = data.label;
  }


  updtFooditem() {
    this.dialogRef.close(
        {event: 'updt', food: this.foodForm.value, foodId: this.updateId});
  }

  addFooditem() {
    this.adminService.addFood(this.foodForm.value).subscribe((data: Food) => {
      this.dialogRef.close({event: 'add', food: data});
    });
  }

}
