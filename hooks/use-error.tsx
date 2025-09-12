import { ErrorContext } from "@/contexts/error-context";
import { useContext } from "react";

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useError must be used within a ErrorProvider");
  }
  return context;
};
