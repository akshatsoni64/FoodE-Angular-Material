export interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  inCart?: boolean;
  isFav?: boolean;
  cartId?: number;
  favId?: number;
}
