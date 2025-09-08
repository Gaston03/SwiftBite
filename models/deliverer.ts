import { Address } from './address';
import { UserRole } from './enums';
import { Order } from './order';
import { PaymentMethod } from './payment-method.js';
import { SBDocument } from './sb-document';

export interface Deliverer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  available: boolean;
  rate: number;
  createdAt: Date;
  updatedAt?: Date;
  role: UserRole;

  address?: Address;
  paymentMethod?: PaymentMethod;
  orders?: Order[];
  documents?: SBDocument[];
}
