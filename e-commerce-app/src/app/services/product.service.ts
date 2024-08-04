import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  constructor(private _http: HttpClient) {}

  //get all products
  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.apiUrl).pipe(shareReplay(1));
  }

  //get single product
  getProduct(id: number): Observable<Product> {
    return this._http.get<Product>(`${this.apiUrl}/${id}`).pipe(shareReplay(1));
  }

  //add product
  addProduct(product: Product): Observable<Product> {
    return this._http.post<Product>(this.apiUrl, product);
  }

  //update product
  updateProduct(id: number, product: Product): Observable<Product> {
    return this._http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  //delete product
  deleteProduct(id: number): Observable<Product> {
    return this._http.delete<Product>(`${this.apiUrl}/${id}`);
  }
}
