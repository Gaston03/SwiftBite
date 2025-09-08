import { OrderProductLine } from "@/models/order-product-line";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";

export type CreateOrderProductLineData = Omit<
  OrderProductLine,
  "id" | "createdAt" | "updatedAt" | "product" | "selectedToppings"
>;

class OrderProductLineService {
  createOrderProductLine = async (
    data: CreateOrderProductLineData
  ): Promise<void> => {
    const { error } = await supabase
      .from("order_product_lines")
      .insert(keysToSnakeCase(data));

    if (error) {
      throw error;
    }
  };

  deleteOrderProductLine = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("order_product_lines")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  getProductLinesByOrderId = async (
    orderId: string
  ): Promise<OrderProductLine[]> => {
    const { data, error } = await supabase
      .from("order_product_lines")
      .select("*")
      .eq("order_id", orderId);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data || []);
  };
}

export const orderProductLineService = new OrderProductLineService();
