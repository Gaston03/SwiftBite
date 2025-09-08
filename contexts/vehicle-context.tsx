import { Vehicle } from "@/models/vehicle";
import {
  CreateVehicleData,
  vehicleService,
} from "@/services/vehicle-service";
import { handleError } from "@/utils/error-handler";
import { createContext, useState } from "react";

interface VehicleContextData {
  vehicle: Vehicle | null;
  loading: boolean;
  createVehicle: (data: CreateVehicleData) => Promise<void>;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
  getVehicleById: (id: string) => Promise<Vehicle | null>;
  getDelivererVehicle: (delivererId: string) => Promise<void>;
}

export const VehicleContext = createContext<VehicleContextData>(
  {} as VehicleContextData
);

export const VehicleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  const createVehicle = async (data: CreateVehicleData) => {
    try {
      await vehicleService.createVehicle(data);
    } catch (error) {
      handleError(error);
    }
  };

  const updateVehicle = async (id: string, vehicle: Partial<Vehicle>) => {
    try {
      await vehicleService.updateVehicle(id, vehicle);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteVehicle = async (id: string) => {
    try {
      await vehicleService.deleteVehicle(id);
    } catch (error) {
      handleError(error);
    }
  };

  const getVehicleById = async (id: string) => {
    try {
      return await vehicleService.getVehicleById(id);
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const getDelivererVehicle = async (delivererId: string) => {
    try {
      setLoading(true);
      const data = await vehicleService.getDelivererVehicle(delivererId);
      setVehicle(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicle,
        loading,
        createVehicle,
        updateVehicle,
        deleteVehicle,
        getVehicleById,
        getDelivererVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
