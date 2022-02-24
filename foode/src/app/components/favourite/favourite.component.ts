import { Component, OnInit } from '@angular/core';
import { Favourite } from 'src/app/models/favourite.model';
import { FavouriteService } from 'src/app/services/favourite/favourite.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  favs!: Favourite[];
  constructor(private readonly favService: FavouriteService) {}

  ngOnInit() {
    this.favService.getFavorites().subscribe((data) => {
      this.favs = data;
    });
  }
}
