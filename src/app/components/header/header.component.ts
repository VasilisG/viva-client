import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  router = inject(Router);
  cartService = inject(CartService);

  isVisible = true;

  ngOnInit(): void {
      this.router.events.subscribe(event => {
        if(event instanceof NavigationEnd){
          if(event.url.indexOf('checkout') !== -1){
            this.closeSideCart();
            this.isVisible = false;
          }
          else this.isVisible = true;
        }
      })
  }

  openSideCart() {
    this.cartService.openSideCart();
  }

  closeSideCart() {
    this.cartService.closeSideCart();
  }
}
