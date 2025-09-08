import { OrderContext } from "@/contexts/order-context";
import { useContext } from "react";

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within a OrderProvider");
  }
  return context;
}