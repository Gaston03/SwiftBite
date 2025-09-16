import { PaymentMethodType } from "./enums";

export interface PaymentMethod {
  id: string;
  customerId: string;
  type: PaymentMethodType;
  last4?: string;
  brand?: string;
  expMonth?: number;
  expYear?: number;
  isDefault: boolean;
  phoneNumber?: string;
  provider?: string;
}
