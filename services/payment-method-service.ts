import { PaymentMethod } from "@/models/payment-method";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";

export type CreatePaymentMethodData = Omit<PaymentMethod, "id" | "isDefault">;

class PaymentMethodService {
  createPaymentMethod = async (
    data: CreatePaymentMethodData
  ): Promise<PaymentMethod> => {
    const { data: newPaymentMethod, error } = await supabase
      .from("payment_methods")
      .insert(keysToSnakeCase(data))
      .select()
      .single();

    if (error) {
      throw error;
    }
    return keysToCamelCase(newPaymentMethod);
  };

  getPaymentMethodsByCustomerId = async (
    customerId: string
  ): Promise<PaymentMethod[]> => {
    const { data, error } = await supabase
      .from("payment_methods")
      .select("*")
      .eq("customer_id", customerId);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data);
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

    return keysToCamelCase(data);
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

  setDefaultPaymentMethod = async (
    id: string,
    customerId: string
  ): Promise<void> => {
    // First, set all other payment methods for the customer to isDefault: false
    const { error: updateError } = await supabase
      .from("payment_methods")
      .update({ is_default: false })
      .eq("customer_id", customerId);

    if (updateError) {
      throw updateError;
    }

    // Then, set the selected payment method to isDefault: true
    const { error: setError } = await supabase
      .from("payment_methods")
      .update({ is_default: true })
      .eq("id", id);

    if (setError) {
      throw setError;
    }
  };
}

export const paymentMethodService = new PaymentMethodService();
