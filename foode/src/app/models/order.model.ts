import {Cart} from './cart.model';

export interface Order {
  id: number;
  user: string;
  address: string;
  cart: Cart[];
  total_price: number;
}