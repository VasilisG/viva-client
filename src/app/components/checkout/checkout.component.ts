import { Component, inject } from '@angular/core';
import { CheckoutService } from '../../services/checkout/checkout.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  checkoutService = inject(CheckoutService);
  cartService = inject(CartService);

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

  placeOrder() {
    this.checkoutService.placeOrder();
  }
}
