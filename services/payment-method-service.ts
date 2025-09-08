import { PaymentMethod } from "@/models/payment-method";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";

export type CreatePaymentMethodData = Omit<
  PaymentMethod,
  "id" | "createdAt" | "updatedAt"
>;

class PaymentMethodService {
  createPaymentMethod = async (
    data: CreatePaymentMethodData
  ): Promise<void> => {
    const { error } = await supabase
      .from("payment_methods")
      .insert(keysToSnakeCase(data));

    if (error) {
      throw error;
    }
  };

  updatePaymentMethod = async (
    id: string,
    data: Partial<PaymentMethod>
  ): Promise<void> => {
    const { error } = await supabase
      .from("payment_methods")
      .update(keysToSnakeCase(data))
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  deletePaymentMethod = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("payment_methods")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  getPaymentMethodById = async (id: string): Promise<PaymentMethod | null> => {
    const { data, error } = await supabase
      .from("payment_methods")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return keysToCamelCase(data);
  };

  getPaymentMethodsByOwnerId = async (
    ownerId: string
  ): Promise<PaymentMethod[]> => {
    const { data, error } = await supabase
      .from("payment_methods")
      .select("*")
      .eq("owner_id", ownerId);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data || []);
  };
}

export const paymentMethodService = new PaymentMethodService();
