import { Topping } from './topping';

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

  selectedToppings?: Topping[];
}
