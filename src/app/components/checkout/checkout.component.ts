import { Component, inject } from '@angular/core';
import { CheckoutService } from '../../services/checkout/checkout.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';
import { PaymentMethod, ShippingMethod } from '../../types/checkout-types';
import { OrderService } from '../../services/order/order.service';
import { OrderPayload } from '../../types/order-types';
import { LoadingService } from '../../services/loading/loading.service';
import { catchError, finalize, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  checkoutService = inject(CheckoutService);
  cartService = inject(CartService);
  orderService = inject(OrderService);
  loadingService = inject(LoadingService);

  checkoutCustomerForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    countryCode: new FormControl('', [Validators.required])
  });

  cartItems = this.cartService.items();

  cartTotal = this.cartService.subTotal;
  vatTotal = this.cartService.vatTotal;
  grandTotal = this.cartService.grandTotal;

  vm$ = this.checkoutService.getCheckoutData();

  constructor() {
    this.vm$.subscribe(data => console.log(data));
  }

  canSubmitOrder() {
    return this.checkoutCustomerForm.valid 
    && this.checkoutService.shippingMethod.value 
    && this.checkoutService.paymentMethod.value
    && this.cartItems.length > 0;
  }

  setShippingMethod(shippingMethod: ShippingMethod){
    this.checkoutService.setShippingMethod(shippingMethod);
  }

  setPaymentMethod(paymentMethod: PaymentMethod){
    this.checkoutService.setPaymentMethod(paymentMethod);
  }

  createOrderPayload() {
    let orderPayload: OrderPayload = {
      customer: { 
        fullname: this.checkoutCustomerForm.value.fullname || '',
        email: this.checkoutCustomerForm.value.email || '',
        phone: this.checkoutCustomerForm.value.phone || '',
        countryCode: this.checkoutCustomerForm.value.countryCode || '',
        requestLang: 'el-GR'
      },
      shippingMethod: this.checkoutService.shippingMethod,
      paymentMethod: this.checkoutService.paymentMethod,
      items: this.checkoutService.cartItems(),
      totals: {
        subTotal: this.cartService.subTotal(),
        vatTotal: this.cartService.vatTotal(),
        grandTotal: this.cartService.grandTotal()
      },
      amount: this.cartService.grandTotal()
    }
    return orderPayload;
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => new Error('An Error occured during payment process. Please try again later.'));
  }

  placeOrder() {
    let orderPayload = this.createOrderPayload();
    this.loadingService.setLoading(true);
    this.orderService.placeOrder(orderPayload)
    .pipe(
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingService.setLoading(false))
    );
  }
}
