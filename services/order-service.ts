import { Order } from "@/models/order";

export type CreateOrderData = Omit<Order, "id" | "createdAt" | "updatedAt">;

//TODO: Implement this class
class OrderService {
  placeOrder = async (data: CreateOrderData): Promise<void> => {};

  replaceOrder = async (orderId: string): Promise<void> => {};

  updateOrder = async (id: string, data: Partial<Order>): Promise<void> => {};

  acceptOrder = async (id: string): Promise<void> => {};

  refuseOrder = async (id: string): Promise<void> => {};

  deleteOrder = async (id: string): Promise<void> => {};

  getOrderById = async (id: string): Promise<Order | null> => {
    return null;
  };

  getEstablishmentOrders = async (
    establishmentId: string
  ): Promise<Order[]> => {
    return [];
  };

  getCustomerOrders = async (customerId: string): Promise<Order[]> => {
    return [];
  };

  getDelivererOrders = async (delivererId: string): Promise<Order[]> => {
    return [];
  };
}

export const orderService = new OrderService();
