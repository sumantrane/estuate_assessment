// In your app or cart service
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartState } from 'src/app/features/cart/cart.state';
import { setCart, updateQuantity } from 'src/app/features/cart/cart.actions';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _store: Store<{ cart: CartState }>) {
    this.initializeCart();
  }

  initializeCart() {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    this._store.dispatch(setCart({ products: cartData }));
  }

  getDefaultQuantity(product: Product): number {
    return product.quantity ?? 1; // Default to 1 if quantity is undefined
  }

  increaseQuantity(productId: number) {
    this._store.dispatch(updateQuantity({ productId, change: 1 }));
  }

  decreaseQuantity(productId: number) {
    this._store.dispatch(updateQuantity({ productId, change: -1 }));
  }
}
