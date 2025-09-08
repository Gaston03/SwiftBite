import { Product } from "@/models/product";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";

export type CreateProductData = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "toppings"
>;

class ProductService {
  createProduct = async (data: CreateProductData): Promise<void> => {
    const { error } = await supabase.from("products").insert(keysToSnakeCase(data));

    if (error) {
      throw error;
    }
  };

  updateProduct = async (
    id: string,
    data: Partial<Product>
  ): Promise<void> => {
    const { error } = await supabase
      .from("products")
      .update(keysToSnakeCase(data))
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  deleteProduct = async (id: string): Promise<void> => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      throw error;
    }
  };

  getProductById = async (id: string): Promise<Product | null> => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return keysToCamelCase(data);
  };

  getEstablishmentProducts = async (
    establishmentId: string
  ): Promise<Product[]> => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("establishment_id", establishmentId);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data || []);
  };
}

export const productService = new ProductService();
