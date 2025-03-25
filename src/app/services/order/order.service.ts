import { inject, Injectable } from '@angular/core';
import { VivaResponse } from '../../types/viva-types';
import { ActivatedRoute } from '@angular/router';
import { OrderPayload } from '../../types/order-types';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  placeOrder(orderPayload: OrderPayload){
    console.log(orderPayload);
  }
}
