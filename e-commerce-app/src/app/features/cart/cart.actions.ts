import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/interfaces/product.interface';

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ product: Product; quantity: number }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; change: number }>()
);
export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ productId: number }>()
);
export const clearCart = createAction('[Cart] Clear Cart');

export const setCart = createAction(
  '[Cart] Set Cart',
  props<{ products: Product[] }>()
);
