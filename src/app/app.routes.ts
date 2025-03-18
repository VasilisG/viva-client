import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SuccessComponent } from './components/success/success.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'success',
    component: SuccessComponent
  },
  {
    path: '*',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];
