import { inject, Injectable } from '@angular/core';
import { OrderPayload } from '../../types/order-types';
import { HttpClient } from '@angular/common/http';
import { ENV } from '../../environment/environment';
import { Observable } from 'rxjs';
import { VivaResponse } from '../../types/viva-types';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http = inject(HttpClient);

  placeOrder(orderPayload: OrderPayload){
    return this.http.post<VivaResponse>(`${ENV.BASE_API_URL}/orders`, orderPayload);
  }
}
