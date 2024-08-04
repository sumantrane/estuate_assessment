import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartTotalQuantity } from './features/cart/cart.selectors';
import { AppState } from './app.state'; // Ensure this path is correct

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cartQuantity$!: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.cartQuantity$ = this.store.select(selectCartTotalQuantity); // Use the selector to get total quantity
  }
}
