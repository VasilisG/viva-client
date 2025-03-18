import { computed, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Product } from '../../types/product';
import * as products from '../../../../data/products.json';
import { of, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _products = signal<Product[]>([]);

  products$ = toObservable(this._products);

  fetchProducts() {
    return of(products).pipe(
      map(data => data['products'] as Product[]),
      tap((data) => this._products.set(data))
    );
  }
}
