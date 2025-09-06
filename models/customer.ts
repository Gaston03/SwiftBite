import { Address } from "./address";
import { Order } from "./order";
import { PaymentMethod } from "./payment-method";

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;

  address?: Address;
  orders?: Order[];
  paymentMethods?: PaymentMethod[];
}
