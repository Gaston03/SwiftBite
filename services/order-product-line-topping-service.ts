import { OrderProductLineTopping } from "@/models/order-product-line-topping";
import { supabase } from "@/utils/supabase";
import { keysToSnakeCase } from "@/utils/case-converter";

class OrderProductLineToppingService {
  createOrderProductLineTopping = async (
    data: OrderProductLineTopping
  ): Promise<void> => {
    const { error } = await supabase
      .from("order_product_line_toppings")
      .insert(keysToSnakeCase(data));

    if (error) {
      throw error;
    }
  };

  deleteOrderProductLineTopping = async (
    productLineId: string,
    toppingId: string
  ): Promise<void> => {
    const { error } = await supabase
      .from("order_product_line_toppings")
      .delete()
      .eq("product_line_id", productLineId)
      .eq("topping_id", toppingId);

    if (error) {
      throw error;
    }
  };
}

export const orderProductLineToppingService =
  new OrderProductLineToppingService();
