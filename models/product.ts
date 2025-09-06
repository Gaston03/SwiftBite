import { Topping } from './topping';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  url: string;

  toppings?: Topping[];
}
