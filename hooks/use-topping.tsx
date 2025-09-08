import { ToppingContext } from "@/contexts/topping-context";
import { useContext } from "react";

export const useTopping = () => {
  const context = useContext(ToppingContext);
  if (context === undefined) {
    throw new Error("useTopping must be used within a ToppingProvider");
  }
  return context;
}