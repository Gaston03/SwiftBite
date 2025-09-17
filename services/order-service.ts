import { Order } from "@/models/order";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";
import { OrderStatus } from "@/models/enums";

export type CreateOrderData = Omit<
  Order,
  "id" | "createdAt" | "updatedAt" | "createAt"
>;

class OrderService {
  placeOrder = async (data: CreateOrderData): Promise<Order> => {
    const { data: newOrder, error } = await supabase
      .from("orders")
      .insert(keysToSnakeCase(data))
      .select()
      .single();

    if (error) {
      throw error;
    }

    return keysToCamelCase(newOrder);
  };

  replaceOrder = async (orderId: string): Promise<void> => {
    const oldOrder = await this.getOrderById(orderId);

    if (oldOrder) {
      const { id, ...rest } = oldOrder;
      const { error } = await supabase
        .from("orders")
        .insert(keysToSnakeCase(rest));

      if (error) {
        throw error;
      }
    }
  };

  updateOrder = async (id: string, data: Partial<Order>): Promise<void> => {
    const { error } = await supabase
      .from("orders")
      .update(keysToSnakeCase(data))
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  acceptOrder = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("orders")
      .update({ status: OrderStatus.ACCEPTED })
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  refuseOrder = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("orders")
      .update({ status: OrderStatus.REFUSED })
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  deleteOrder = async (id: string): Promise<void> => {
    const { error } = await supabase.from("orders").delete().eq("id", id);

    if (error) {
      throw error;
    }
  };

  getOrderById = async (id: string): Promise<Order | null> => {
    const { data, error } = await supabase
      .from("orders")
      .select("*, productLines:order_product_lines(*, product:products(*))")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return keysToCamelCase(data);
  };

  getEstablishmentOrders = async (
    establishmentId: string
  ): Promise<Order[]> => {
    const { data, error } = await supabase
      .from("orders")
      .select("*, productLines:order_product_lines(*, product:products(*))")
      .eq("establishment_id", establishmentId);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data || []);
  };

  getCustomerOrders = async (customerId: string): Promise<Order[]> => {
    const { data, error } = await supabase
      .from("orders")
      .select("*, productLines:order_product_lines(*, product:products(*))")
      .eq("customer_id", customerId);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data || []);
  };

  getDelivererOrders = async (delivererId: string): Promise<Order[]> => {
    const { data, error } = await supabase
      .from("orders")
      .select("*, productLines:order_product_lines(*, product:products(*))")
      .eq("deliverer_id", delivererId);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data || []);
  };
}

export const orderService = new OrderService();
