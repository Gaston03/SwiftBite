import { Address } from './address';
import { OrderStatus } from './enums';
import { OrderProductLine } from './order-product-line.js';

export interface Order {
  id: string;
  status: OrderStatus;
  createdAt: Date;
  deliveryFine: number;
  totalPrice: number;
  deliveringAddress: Address;

  // customer: Customer;
  // establishment: Establishment;
  // deliverer?: Deliverer;
  productLines?: OrderProductLine[];
}
