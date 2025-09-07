import { Vehicle } from "@/models/vehicle";

export type CreateVehicleData = Omit<
  Vehicle,
  "id" | "createdAt" | "updatedAt" | "documents"
>;

//TODO: Implement this class
class VehicleService {
  createVehicle = async (data: CreateVehicleData): Promise<void> => {};

  updateVehicle = async (
    id: string,
    vehicle: Partial<Vehicle>
  ): Promise<void> => {};

  deleteVehicle = async (id: string): Promise<void> => {};

  getDelivererVehicle = async (
    delivererId: string
  ): Promise<Vehicle | null> => {
    return null;
  };

  getVehicleById = async (id: string): Promise<Vehicle | null> => {
    return null;
  };

  getVehicleDocuments = async (id: string): Promise<Document[]> => {
    return [];
  };
}

export const vehicleService = new VehicleService();
