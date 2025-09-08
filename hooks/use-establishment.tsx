import { EstablishmentContext } from "@/contexts/establishment-context";
import { useContext } from "react";

export const useEstablishment = () => {
  const context = useContext(EstablishmentContext);
  if (context === undefined) {
    throw new Error("useEstablishment must be used within a EstablishmentProvider");
  }
  return context;
}