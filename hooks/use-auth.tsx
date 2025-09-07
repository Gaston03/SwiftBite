import { AuthContext } from "@/contexts/auth-context";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("usePayments must be used within a PaymentsProvider");
  }
  return context;
}