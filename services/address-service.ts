import { Address } from "@/models/address";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";

export type CreateAddressData = Omit<Address, "id">;

class AddressService {
  createAddress = async (data: CreateAddressData): Promise<Address> => {
    const { data: newAddress, error } = await supabase
      .from("addresses")
      .insert(keysToSnakeCase(data))
      .select()
      .single();

    if (error) {
      throw error;
    }
    return keysToCamelCase(newAddress);
  };

  updateAddress = async (
    id: string,
    address: Partial<Address>
  ): Promise<void> => {
    const { error } = await supabase
      .from("addresses")
      .update(keysToSnakeCase(address))
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  deleteAddress = async (id: string): Promise<void> => {
    const { error } = await supabase.from("addresses").delete().eq("id", id);

    if (error) {
      throw error;
    }
  };

  getAddressesByCustomerId = async (customerId: string): Promise<Address[]> => {
    console.log('customerId', customerId)
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("customer_id", customerId);

    if (error) {
      console.log('error', error)
      throw error;
    }

    return keysToCamelCase(data);
  };
}

export const addressService = new AddressService();
