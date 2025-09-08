import { ProductContext } from "@/contexts/product-context";
import { useContext } from "react";

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}