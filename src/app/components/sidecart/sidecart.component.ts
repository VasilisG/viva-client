import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CartItem } from '../../types/cartItem';

@Component({
  selector: 'app-sidecart',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sidecart.component.html',
  styleUrl: './sidecart.component.css'
})
export class SidecartComponent implements OnInit {

  router = inject(Router);
  cartService = inject(CartService);

  isVisible = true;

  cartItems = this.cartService.items;
  cartTotal = this.cartService.subTotal;
  vatTotal = this.cartService.vatTotal;
  grandTotal = this.cartService.grandTotal;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.url.indexOf('checkout') !== -1){
          this.closeSideCart();
          this.isVisible = false;
        }
        else this.isVisible = true;
      }
    });
  }

  closeSideCart() {
    this.cartService.closeSideCart();
  }

  removeFromCart(cartItem: CartItem){
    this.cartService.removeFromCart(cartItem);
  }
}
