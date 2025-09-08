import { DelivererContext } from "@/contexts/deliverer-context";
import { useContext } from "react";

export const useDeliverer = () => {
  const context = useContext(DelivererContext);
  if (context === undefined) {
    throw new Error("useDeliverer must be used within a DelivererProvider");
  }
  return context;
}