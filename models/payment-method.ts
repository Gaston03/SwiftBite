import { PaymentMethodType } from "./enums";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  countryCode?: string;
  phone?: string;
  ownerFirstName?: string;
  ownerLastName?: string;
  cardLast4Digits?: string;
  createdAt: Date;
  updatedAt?: Date;
}
