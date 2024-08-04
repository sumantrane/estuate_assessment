// In your effects file
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { setCart } from 'src/app/features/cart/cart.actions';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions) {}

  initializeCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Initialize'),
      switchMap(() => {
        const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
        return of(setCart({ products: cartData }));
      })
    )
  );
}
