import { CartItem } from "./cartItem";
import { PaymentMethod, ShippingMethod } from "./checkout-types";

export type OrderItem = CartItem;

export type OrderTotals = {
  subTotal: number;
  vatTotal: number;
  grandTotal: number;
}

export type CustomerInfo = {
  email: string;
  fullname: string;
  phone: string;
  countryCode: string;
  requestLang: string;
}

export type OrderPayload = {
  customer: CustomerInfo;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  totals: OrderTotals;
  amount: number;
}