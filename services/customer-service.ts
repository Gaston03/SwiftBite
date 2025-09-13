import { Customer } from "@/models/customer";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";

export type CreateCustomerData = Omit<
  Customer,
  "id" | "createdAt" | "updatedAt" | "address" | "orders" | "paymentMethods"
>;

class CustomerService {
  createCustomer = async (data: CreateCustomerData): Promise<Customer> => {
    const { data: newCustomer, error } = await supabase
      .from("customers")
      .insert(keysToSnakeCase(data))
      .select()
      .single();

    if (error) {
      throw error;
    }
    return keysToCamelCase(newCustomer);
  };

  updateCustomer = async (
    id:string,
    customer: Partial<Customer>
  ): Promise<void> => {
    const { error } = await supabase
      .from("customers")
      .update(keysToSnakeCase(customer))
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  deleteCustomer = async (id: string): Promise<void> => {
    const { error } = await supabase.from("customers").delete().eq("id", id);

    if (error) {
      throw error;
    }
  };

  getCustomer = async (id: string): Promise<Customer | null> => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return keysToCamelCase(data);
  };
}

export const customerService = new CustomerService();
