import { Topping } from "@/models/topping";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";

export type CreateToppingData = Omit<Topping, "id" | "createdAt" | "updatedAt">;

class ToppingService {
  createTopping = async (data: CreateToppingData): Promise<void> => {
    const { error } = await supabase
      .from("toppings")
      .insert(keysToSnakeCase(data));

    if (error) {
      throw error;
    }
  };

  updateTopping = async (id: string, data: Partial<Topping>): Promise<void> => {
    const { error } = await supabase
      .from("toppings")
      .update(keysToSnakeCase(data))
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  deleteTopping = async (id: string): Promise<void> => {
    const { error } = await supabase.from("toppings").delete().eq("id", id);

    if (error) {
      throw error;
    }
  };

  getToppingById = async (id: string): Promise<Topping | null> => {
    const { data, error } = await supabase
      .from("toppings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return keysToCamelCase(data);
  };

  getToppingsByProductId = async (productId: string): Promise<Topping[]> => {
    const { data, error } = await supabase
      .from("toppings")
      .select("*")
      .eq("product_id", productId);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data || []);
  };

  getOrderProductLineSelectedToppings = async (
    orderProductLineId: string
  ): Promise<Topping[]> => {
    const { data, error } = await supabase
      .from("order_product_line_toppings")
      .select("toppings(*)")
      .eq("product_line_id", orderProductLineId);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data || []);
  };
}

export const toppingService = new ToppingService();
