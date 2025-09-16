import { PaymentMethodType } from "./enums";

export interface PaymentMethod {
  id: string;
  customerId: string;
  type: PaymentMethodType;
  last4?: string;
  brand?: string;
  expMonth?: number;
  expYear?: number;
  phoneNumber?: string;
  provider?: string;
}
