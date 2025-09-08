import { OrderProductLineToppingContext } from "@/contexts/order-product-line-topping-context";
import { useContext } from "react";

export const useOrderProductLineTopping = () => {
  const context = useContext(OrderProductLineToppingContext);
  if (context === undefined) {
    throw new Error("useOrderProductLineTopping must be used within a OrderuseOrderProductLineToppingProvider");
  }
  return context;
}