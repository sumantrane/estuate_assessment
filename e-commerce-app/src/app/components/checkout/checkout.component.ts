// checkout.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { CartState } from 'src/app/features/cart/cart.state';
import {
  selectCartProducts,
  selectCartTotal,
  selectCartTotalQuantity,
} from 'src/app/features/cart/cart.selectors';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from 'src/app/features/cart/cart.actions';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  cartProducts$: Observable<Product[]>;
  cartTotal$: Observable<number>;

  constructor(
    private store: Store<{ cart: CartState }>,
    private cartService: CartService
  ) {
    this.cartProducts$ = this.store.select(selectCartProducts);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  getDefaultQuantity(product: Product): number {
    return this.cartService.getDefaultQuantity(product);
  }

  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  addToCart(product: Product, quantity: number) {
    this.store.dispatch(addToCart({ product, quantity }));
  }

  placeOrder() {}

  removeItem(productId: number) {
    this.store.dispatch(removeFromCart({ productId }));
  }
}
