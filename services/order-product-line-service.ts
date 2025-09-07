import { OrderProductLine } from "@/models/order-product-line";

export type CreateOrderProductLineData = Omit<
  OrderProductLine,
  "id" | "createdAt" | "updatedAt" | "product" | "selectedToppings"
>;

class OrderProductLineService {
  createOrderProductLine = async (
    data: CreateOrderProductLineData
  ): Promise<void> => {};

  deleteOrderProductLine = async (id: string): Promise<void> => {};

  getProductLinesByOrderId = async (
    orderId: string
  ): Promise<OrderProductLine[]> => {
    return [];
  };
}

export const orderProductLineService = new OrderProductLineService();
