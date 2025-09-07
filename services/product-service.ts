import { Product } from "@/models/product";

export type CreateProductData = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "toppings"
>;

class ProductService {
  createProduct = async (data: CreateProductData): Promise<void> => {};

  updateProduct = async (
    id: string,
    data: Partial<Product>
  ): Promise<void> => {};

  deleteProduct = async (id: string): Promise<void> => {};

  getProductById = async (id: string): Promise<Product | null> => {
    return null;
  };

  getEstablishmentProducts = async (
    establishmentId: string
  ): Promise<Product[]> => {
    return [];
  };
}

export const productService = new ProductService();
