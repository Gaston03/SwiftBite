import { PaymentMethodContext } from "@/contexts/payment-method-context";
import { useContext } from "react";

export const usePaymentMethod = () => {
  const context = useContext(PaymentMethodContext);
  if (context === undefined) {
    throw new Error("usePaymentMethod must be used within a PaymentMethodProvider");
  }
  return context;
}