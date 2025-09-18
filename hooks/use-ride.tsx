import { RideContext } from "@/contexts/ride-context";
import { useContext } from "react";

export const useRide = () => {
  const context = useContext(RideContext);
  if (context === undefined) {
    throw new Error("useRide must be used within a RideProvider");
  }
  return context;
};
