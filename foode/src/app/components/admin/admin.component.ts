import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { AddFoodComponent } from 'src/app/dialogs/admin/add-food/add-food.component';
import { DelFoodComponent } from 'src/app/dialogs/admin/del-food/del-food.component';
import { Food } from 'src/app/models/food.model';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  food!: Food[];
  foodCount!: number;
  foodProps!: string[];
  @ViewChild(MatTable) table!: MatTable<Food>;

  constructor(
    private readonly adminService: AdminService, public dialog: MatDialog,
    private readonly snackbar: MatSnackBar) { }

  ngOnInit() {
    this.adminService.getFood().subscribe((data: Food[]) => {
      this.food = data;
      this.foodCount = data.length;
      this.foodProps = ['name', 'description', 'price', 'action'];
    });
  }

  openAddFoodDialog() {
    const dialogRef = this.dialog.open(
      AddFoodComponent, { data: { 'label': 'provide', 'food': null } });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`AddDialog result: ${result.event}`);
      if (result.event === 'add') {
        this.food.push(result.food);
        this.foodCount = this.food.length;
        this.table.renderRows();
      }
    });
  }

  openDelFoodDialog(food: Food) {
    // console.log(`deleting ${food.id}`);
    const dialogRef =
      this.dialog.open(DelFoodComponent, { data: { 'foodId': food.id } });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`DeleteDialog result: ${result.event} : ${result.foodId}`);
      if (result.event === 'delete') {
        this.adminService.deleteFood(result.foodId).subscribe((res) => {
          this.food = this.food.filter((food) => food.id !== result.foodId);
          this.foodCount = this.food.length;
          this.table.renderRows();
        });
      }
    });
  }

  editFooditem(food: Food) {
    const dialogRef = this.dialog.open(
      AddFoodComponent, { data: { 'label': 'update', 'food': food } });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'updt') {
        const sbref =
          this.snackbar.open('Item update', 'UNDO', { duration: 2000 });

        sbref.onAction().subscribe(
          (result) => {
            // console.log('Cancelling update');
          });

        sbref.afterDismissed().subscribe((res) => {
          if (!res.dismissedByAction) {
            this.adminService.updateFood(result.foodId, result.food)
              .subscribe((result) => {
                this.food.forEach((item) => {
                  if (item.id === result.id) {
                    item.name = result.name,
                      item.description = result.description,
                      item.price = result.price;
                  }
                });
              });
          }
        });
      }
    });
  }

}
