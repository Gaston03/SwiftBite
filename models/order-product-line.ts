import {Product} from './product';
import {OrderProductLineTopping} from './order-product-line-topping.js';

export interface OrderProductLine {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;

  product: Product;
  selectedTopping?: OrderProductLineTopping[];
}
