import { inject, Injectable } from '@angular/core';
import { OrderPayload } from '../../types/order-types';
import { HttpClient } from '@angular/common/http';
import { ENV } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http = inject(HttpClient);

  placeOrder(orderPayload: OrderPayload){
    return this.http.post<OrderPayload>(`${ENV.BASE_API_URL}/orders`, orderPayload);
  }
}
