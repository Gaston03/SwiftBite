import { OrderProductLineTopping } from "@/models/order-product-line-topping";

//TODO: Implement this class
class OrderProductLineToppingService {
  createOrderProductLineTopping = async (
    data: OrderProductLineTopping
  ): Promise<void> => {};

  deleteOrderProductLineTopping = async (id: string): Promise<void> => {};
}

export const orderProductLineToppingService =
  new OrderProductLineToppingService();
