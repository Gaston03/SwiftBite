import { Address } from "./address";
import { OrderStatus } from "./enums";
import { Product } from "./product";
import { Topping } from "./topping";

export interface OrderProductLine {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt?: Date;
  product: Product;
  selectedToppings: Topping[];
}

export interface Order {
  id: string;
  customerId: string;
  establishmentId: string;
  delivererId?: string;
  status: OrderStatus;
  createdAt: Date;
  deliveryFee: number;
  totalPrice: number;
  deliveringAddressId?: string;
  deliveringAddress?: Address;
  estimatedDeliveryTime?: string;
  updatedAt?: Date;
  productLines: OrderProductLine[];
}
