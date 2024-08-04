import { createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = (state: { cart: CartState }) => state.cart;

export const selectCartProducts = createSelector(
  selectCartState,
  (cartState: CartState) => cartState.products
);

export const selectCartTotal = createSelector(selectCartProducts, (products) =>
  products.reduce(
    (total, product) => total + product.price * (product.quantity || 0),
    0
  )
);

export const selectCartTotalQuantity = createSelector(
  selectCartProducts,
  (products) =>
    products.reduce((total, product) => total + (product.quantity || 0), 0)
);
