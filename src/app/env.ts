export const ENVIRONMENT = "dev";

export const PAYMENT_ORDER_ENDPOINT = {
  "dev": "https://demo-api.vivapayments.com/checkout/v2/orders",
  "prod": "https://api.vivapayments.com/checkout/v2/orders"
}

export const PAYMENT_REDIRECT_ENDPOINT = {
  "dev": "https://demo.vivapayments.com/web/checkout?ref=",
  "prod": "https://www.vivapayments.com/web/checkout?ref="
}