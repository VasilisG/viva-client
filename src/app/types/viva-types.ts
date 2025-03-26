import { CustomerInfo } from "./order-types";

export type EventInfo = {
  title: string;
  message: string;
}

export type VivaPayload = {
  amount: number;
  customer: CustomerInfo;
  currency: number;
  sourceCode: string;
}

export type VivaResponse = {
  success: boolean;
  data?: {
    orderCode?: string;
    redirectUrl?: string;
  }
  message?: string;
}

export type VivaQueryParams = {
  eventId: string;
  eci: string;
  t?: string;
  s: string;
  lang: string;
};