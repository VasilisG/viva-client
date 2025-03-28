import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../types/cartItem';
import { Product } from '../../types/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  private toastService = inject(ToastrService);

  products$ = this.productsService.products$;

  ngOnInit(): void {
    this.productsService.fetchProducts().subscribe();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.toastService.success(`Product ${product.name} added to cart.`, 'Info');
  }

}
