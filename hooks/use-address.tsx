import { AddressContext } from "@/contexts/address-context";
import { useContext } from "react";

export const useAddress = () => {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }

  return context;
};
