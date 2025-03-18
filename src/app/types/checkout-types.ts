interface CheckoutEntity {
  label: string;
  value: string;
}

interface ShippingMethod extends CheckoutEntity {}
interface PaymentMethod extends CheckoutEntity {}