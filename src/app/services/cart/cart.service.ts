import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../types/product';
import { CartItem } from '../../types/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = signal<CartItem[]>([]);
  private sideCartOpen = signal(false);

  isSideCartOpen = computed(() => this.sideCartOpen());
  items = computed(() => this.cartItems());
  totalItems = computed(() => this.cartItems().length);
  subTotal = computed(() => this.cartItems().reduce((acc, product) => acc + product.price * product.qty, 0));
  vatTotal = computed(() => this.cartItems().reduce((acc, product) => acc + (product.price * 0.06) * product.qty, 0));
  grandTotal = computed(() => this.subTotal() + this.vatTotal());

  addToCart(product: Product) {
    for(let cartItem of this.cartItems()){
      if(cartItem.id === product.id){
        let updatedItem = {...cartItem};
        updatedItem.qty += 1;
        this.cartItems.update((items) => items.map((item) => item.id === product.id ? updatedItem : item));
        return;
      }
    }
    this.cartItems.update((items) => [...items, {
      id: product.id,
      sku: product.sku,
      name: product.name,
      qty: 1,
      price: product.price,
      image: product.image
    }]);
  }

  removeFromCart(cartItem: CartItem) {
    for(let item of this.cartItems()){
      if(cartItem.id === item.id){
        this.cartItems.update((items) => items.filter(item => item.id !== cartItem.id));
        return;
      }
    }
  }

  openSideCart() {
    this.sideCartOpen.set(true);
  }

  closeSideCart() {
    this.sideCartOpen.set(false);
  }

  toggleSideCart() {
    this.sideCartOpen.set(!this.sideCartOpen());
  }
}
