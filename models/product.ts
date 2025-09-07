import { Topping } from './topping';

export interface Product {
  id: string;
  establishmentId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  url: string;
  available: boolean;
  createdAt: Date;
  updatedAt?: Date;

  toppings?: Topping[];
}
