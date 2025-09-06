import {OrderProductLine} from './order-product-line.js';
import {Topping} from './topping';

export interface OrderProductLineTopping {
  id: string;
  
  orderProductLine: OrderProductLine;
  topping: Topping;
}
