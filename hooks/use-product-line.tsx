import { OrderProductLineContext } from "@/contexts/order-product-line-context";
import { useContext } from "react";

export const useOrderProductLine = () => {
  const context = useContext(OrderProductLineContext);
  if (context === undefined) {
    throw new Error("useOrderProductLine must be used within a OrderProductLineProvider");
  }
  return context;
}