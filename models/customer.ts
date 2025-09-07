import { Address } from "./address";
import { UserRole } from "./enums";
import { Order } from "./order";
import { PaymentMethod } from "./payment-method";

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt?: Date
  role: UserRole;

  address?: Address;
  orders?: Order[];
  paymentMethods?: PaymentMethod[];
}
