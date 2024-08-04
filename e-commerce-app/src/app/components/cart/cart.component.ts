import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { clearCart, removeFromCart } from 'src/app/features/cart/cart.actions';
import {
  selectCartProducts,
  selectCartTotalQuantity,
} from 'src/app/features/cart/cart.selectors';
import { CartState } from 'src/app/features/cart/cart.state';
import { Product } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartProducts$: Observable<Product[]>;
  cartTotal$: Observable<number>;
  constructor(
    private _store: Store<{ cart: CartState }>,
    private cartService: CartService
  ) {
    this.cartProducts$ = this._store.select(selectCartProducts);
    this.cartTotal$ = this._store.select(selectCartTotalQuantity);
  }
  getDefaultQuantity(product: Product): number {
    return this.cartService.getDefaultQuantity(product);
  }

  increaseQuantity(productId: number) {
    return this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number) {
    return this.cartService.decreaseQuantity(productId);
  }

  removeProduct(productId: number) {
    this._store.dispatch(removeFromCart({ productId }));
  }

  clearCart() {
    this._store.dispatch(clearCart());
  }
}
