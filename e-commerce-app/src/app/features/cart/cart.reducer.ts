import { Action, createReducer, on } from '@ngrx/store';
import { CartState, initialState } from './cart.state';
import {
  addToCart,
  removeFromCart,
  clearCart,
  setCart,
  updateQuantity,
} from './cart.actions';

const _cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product, quantity }) => {
    const existingProduct = state.products.find((p) => p.id === product.id);
    if (existingProduct) {
      // If the product already exists in the cart, update its quantity
      const updatedProducts = state.products.map((p) =>
        p.id === product.id
          ? { ...p, quantity: (p.quantity || 0) + quantity }
          : p
      );
      return { ...state, products: updatedProducts };
    } else {
      // If the product does not exist, add it to the cart
      return {
        ...state,
        products: [...state.products, { ...product, quantity }],
      };
    }
  }),

  // Handle removing a product from the cart
  on(removeFromCart, (state, { productId }) => {
    const updatedProducts = state.products.filter((p) => p.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedProducts)); // Save to local storage
    return {
      ...state,
      products: updatedProducts,
      count: updatedProducts.length,
    };
  }),

  // Handle clearing the cart
  on(clearCart, (state) => {
    localStorage.removeItem('cart'); // Clear local storage
    return {
      ...state,
      products: [],
      count: 0,
    };
  }),

  // Handle setting the cart from local storage
  on(setCart, (state, { products }) => ({
    ...state,
    products,
    count: products.length,
  })),
  on(updateQuantity, (state, { productId, change }) => {
    const updatedProducts = state.products.map((product) => {
      if (product.id === productId) {
        const newQuantity = (product.quantity || 0) + change;
        return { ...product, quantity: Math.max(newQuantity, 1) }; // Prevent quantity from going below 1
      }
      return product;
    });
    return { ...state, products: updatedProducts };
  })
);

export function cartReducer(state: CartState | undefined, action: Action) {
  return _cartReducer(state, action);
}
