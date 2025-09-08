import { VehicleContext } from "@/contexts/vehicle-context";
import { useContext } from "react";

export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error("useVehicle must be used within a VehicleProvider");
  }
  return context;
}