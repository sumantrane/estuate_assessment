import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { addToCart } from 'src/app/features/cart/cart.actions';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> = of([]);
  loader = true;
  quantities: { [key: number]: number } = {}; // Track quantities

  constructor(private _productService: ProductService, private store: Store) {}

  ngOnInit() {
    this.products$ = this._productService.getProducts().pipe(
      tap(() => (this.loader = true)), // Show loader while fetching
      switchMap((products) => {
        this.loader = false; // Hide loader after fetching
        return of(products); // Emit products
      }),
      tap((products) => {
        // Ensure products is an array, even if empty
        if (!Array.isArray(products)) {
          throw new Error('Fetched data is not an array');
        }
      })
    );
  }

  setQuantity(productId: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    if (quantity > 0) {
      this.quantities[productId] = quantity;
    }
  }

  addToCart(product: Product) {
    const quantity = this.quantities[product.id] || 1;
    this.store.dispatch(addToCart({ product, quantity }));
  }

  loadProducts() {
    this.products$ = this._productService.getProducts().pipe(
      tap(() => (this.loader = true)),
      switchMap((products) => {
        this.loader = false;
        return new Observable<Product[]>((observer) => {
          observer.next(products);
          observer.complete();
        });
      }),
      catchError((error) => {
        console.error('Error loading products:', error);
        this.loader = false;
        return of([]); // Return an empty array on error
      })
    );
  }
}
