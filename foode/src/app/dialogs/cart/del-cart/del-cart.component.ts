import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-del-cart',
  templateUrl: './del-cart.component.html',
  styleUrls: ['./del-cart.component.css']
})
export class DelCartComponent implements OnInit {
  delId!: number;
  constructor(
      private readonly dialogRef: MatDialogRef<DelCartComponent>,
      @Inject(MAT_DIALOG_DATA) data: any) {
    this.delId = data.delId;
  }

  ngOnInit() {}

  deleteCartItem() {
    this.dialogRef.close({event: 'delCart', id: this.delId});
  }
}
