import { computed, inject, Injectable, signal } from '@angular/core';
import { CartService } from '../cart/cart.service';
import * as shippingItems from '../../../../data/shipping-methods.json';
import * as paymentItems from '../../../../data/payment-methods.json';
import { combineLatest, forkJoin, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  cartService = inject(CartService);

  shippingMethods$ = of(shippingItems);
  paymentMethods$ = of(paymentItems);

  cartItems = computed(() => this.cartService.items());

  getCheckoutData() {
    return combineLatest({
      shippingMethods: this.shippingMethods$,
      paymentMethods: this.paymentMethods$
  }).pipe(
      map((data) => { 
        return {
          shippingMethods: data.shippingMethods.items,
          paymentMethods: data.paymentMethods.items
        }
      })
    );
  }

  placeOrder(){
    console.log('Placing order...');
  }
}
