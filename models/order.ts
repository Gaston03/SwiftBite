import { Address } from "./address";
import { OrderStatus } from "./enums";
import { OrderProductLine } from "./order-product-line.js";

export interface Order {
  id: string;
  customerId: string;
  establishmentId: string;
  delivererId?: string;
  status: OrderStatus;
  createdAt: Date;
  deliveryFee: number;
  totalPrice: number;
  deliveringAddress: Address;
  estimatedDeliveryTime?: string;
  createAt: Date;
  updatedAt?: Date;

  // customer: Customer;
  // establishment: Establishment;
  // deliverer?: Deliverer;
  productLines: OrderProductLine[];
}
