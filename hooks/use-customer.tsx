import { CustomerContext } from "@/contexts/customer-context";
import { useContext } from "react";

export const useCustomer = () => {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
};
