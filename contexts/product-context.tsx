import { useError } from "@/hooks/use-error";
import { Product } from "@/models/product";
import {
  CreateProductData,
  productService,
} from "@/services/product-service";
import { createContext, useCallback, useState } from "react";

interface ProductContextData {
  products: Product[];
  loading: boolean;
  createProduct: (data: CreateProductData) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Promise<Product | null>;
  getEstablishmentProducts: (establishmentId: string) => Promise<void>;
}

export const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData
);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { handleError } = useError();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const createProduct = async (data: CreateProductData) => {
    try {
      await productService.createProduct(data);
    } catch (error) {
      handleError(error);
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    try {
      await productService.updateProduct(id, product);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productService.deleteProduct(id);
    } catch (error) {
      handleError(error);
    }
  };

  const getProductById = async (id: string) => {
    try {
      return await productService.getProductById(id);
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const getEstablishmentProducts = useCallback(
    async (establishmentId: string) => {
      try {
        setLoading(true);
        const data = await productService.getEstablishmentProducts(
          establishmentId
        );
        setProducts(data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        createProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getEstablishmentProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
