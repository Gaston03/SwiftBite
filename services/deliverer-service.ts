import { Deliverer } from "@/models/deliverer";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";

export type CreateDelivererData = Omit<
  Deliverer,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "address"
  | "paymentMethod"
  | "vehicle"
  | "orders"
  | "documents"
>;

class DelivererService {
  createDeliverer = async (data: CreateDelivererData): Promise<void> => {
    const { error } = await supabase
      .from("deliverers")
      .insert(keysToSnakeCase(data));

    if (error) {
      throw error;
    }
  };

  updateDeliverer = async (
    id: string,
    deliverer: Partial<Deliverer>
  ): Promise<void> => {
    const { error } = await supabase
      .from("deliverers")
      .update(keysToSnakeCase(deliverer))
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  deleteDeliverer = async (id: string): Promise<void> => {
    const { error } = await supabase.from("deliverers").delete().eq("id", id);

    if (error) {
      throw error;
    }
  };

  getDeliverer = async (id: string): Promise<Deliverer | null> => {
    const { data, error } = await supabase
      .from("deliverers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return keysToCamelCase(data);
  };
}

export const delivererService = new DelivererService();
