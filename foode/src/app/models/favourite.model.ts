import { Food } from './food.model';

export interface Favourite {
  id: number; food: Food; user: number;
}