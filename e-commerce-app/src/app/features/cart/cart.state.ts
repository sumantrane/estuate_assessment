import { Product } from 'src/app/interfaces/product.interface';

export interface CartState {
  products: Product[];
  count: number;
}

export const initialState: CartState = {
  products: JSON.parse(localStorage.getItem('cart') || '[]'),
  count: 0,
};
