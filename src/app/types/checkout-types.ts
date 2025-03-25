interface CheckoutEntity {
  label: string;
  value: string;
}

export interface ShippingMethod extends CheckoutEntity {}
export interface PaymentMethod extends CheckoutEntity {}