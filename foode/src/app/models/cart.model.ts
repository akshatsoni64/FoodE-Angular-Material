import {Food} from './food.model';

export interface Cart {
  id: number;
  food: Food;
  quantity: number;
  user: number;
  total_price: number;
}