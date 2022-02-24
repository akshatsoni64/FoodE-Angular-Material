import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DelCartComponent } from 'src/app/dialogs/cart/del-cart/del-cart.component';
import { Food } from 'src/app/models/food.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { FavouriteService } from 'src/app/services/favourite/favourite.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  food!: Food[];
  foodCount!: number;

  constructor(
    private readonly service: MenuService,
    private readonly cartService: CartService,
    private readonly favService: FavouriteService,
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar) { }

  ngOnInit() {
    this.service.getFoodItems().subscribe((data) => {
      this.food = data;
      this.foodCount = data.length;
    });
  }

  addFav(item: Food) {
    this.favService.createFavourite(item).subscribe((data) => {
      this.food.forEach((food) => {
        if (food.id === item.id) {
          food.isFav = true;
          food.favId = data.id;
          // alert(`Adding ${food.name} to favourites with ID ${food.favId}`);
        }
      });
    });
  }

  delFav(item: Food) {
    const sbref = this.snackbar.open(
      `Unfavourited ${item.name}`, 'UNDO', { duration: 2000 });

    sbref.onAction().subscribe(
      (result) => {
        // console.log('Cancelling update');
      });

    sbref.afterDismissed().subscribe((res) => {
      if (!res.dismissedByAction) {
        this.favService.deleteFavourite(item.favId || 0).subscribe((data) => {
          this.food.forEach((fItem) => {
            if (fItem.id === item.id) {
              fItem.isFav = false;
              delete fItem['favId'];
              // alert(`Removing ${fItem.name} to favourites as
              // ${fItem['favId']}`);
            }
          });
        });
      }
    });
  }

  addCart(item: Food) {
    this.cartService.createCart(item).subscribe((data) => {
      this.cartService.emitCart();
      this.food.forEach((fItem) => {
        if (fItem.id === item.id) {
          fItem.inCart = true;
          fItem.cartId = data.id;
        }
      });
    });
  }

  deleteCart(item: Food) {
    const dialogRef =
      this.dialog.open(DelCartComponent, { data: { 'delId': item.id } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'delCart') {
        this.cartService.deleteCart(item.cartId || 0).subscribe(() => {
          this.cartService.emitCart();
          this.food.forEach((fItem) => {
            if (fItem.id === item.id) {
              fItem.inCart = false;
              delete fItem['cartId'];
            }
          });
        });
      }
    });
  }

}
