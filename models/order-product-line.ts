import { Product } from './product';
import { Topping } from './topping';

export interface OrderProductLine {
  id: string;
  orderId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt?: Date;

  product: Product;
  selectedToppings?: Topping[];
}
