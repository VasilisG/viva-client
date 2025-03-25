import { computed, inject, Injectable, signal } from '@angular/core';
import { CartService } from '../cart/cart.service';
import * as shippingItems from '../../../../data/shipping-methods.json';
import * as paymentItems from '../../../../data/payment-methods.json';
import { combineLatest, forkJoin, map, of, tap } from 'rxjs';
import { PaymentMethod, ShippingMethod } from '../../types/checkout-types';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  cartService = inject(CartService);

  shippingMethods$ = of(shippingItems);
  paymentMethods$ = of(paymentItems);

  selectedShippingMethod: ShippingMethod = {label: '', value: ''};
  selectedPaymentMethod: PaymentMethod = {label: '', value: ''};

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

  setShippingMethod(shippingMethod: ShippingMethod){
    this.selectedShippingMethod = shippingMethod;
  }

  get shippingMethod() {
    return this.selectedShippingMethod;
  }

  setPaymentMethod(paymentMethod: PaymentMethod) {
    this.selectedPaymentMethod = paymentMethod;
  }

  get paymentMethod() {
    return this.selectedPaymentMethod;
  }
}
