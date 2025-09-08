import { Vehicle } from "@/models/vehicle";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";

export type CreateVehicleData = Omit<
  Vehicle,
  "id" | "createdAt" | "updatedAt" | "documents"
>;

class VehicleService {
  createVehicle = async (data: CreateVehicleData): Promise<void> => {
    const { error } = await supabase
      .from("vehicles")
      .insert(keysToSnakeCase(data));

    if (error) {
      throw error;
    }
  };

  updateVehicle = async (
    id: string,
    vehicle: Partial<Vehicle>
  ): Promise<void> => {
    const { error } = await supabase
      .from("vehicles")
      .update(keysToSnakeCase(vehicle))
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  deleteVehicle = async (id: string): Promise<void> => {
    const { error } = await supabase.from("vehicles").delete().eq("id", id);

    if (error) {
      throw error;
    }
  };

  getDelivererVehicle = async (
    delivererId: string
  ): Promise<Vehicle | null> => {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("deliverer_id", delivererId)
      .single();

    if (error) {
      throw error;
    }

    return keysToCamelCase(data);
  };

  getVehicleById = async (id: string): Promise<Vehicle | null> => {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return keysToCamelCase(data);
  };

  getVehicleDocuments = async (id: string): Promise<Document[]> => {
    const { data, error } = await supabase
      .from("vehicle_documents")
      .select("sb_documents(*)")
      .eq("vehicle_id", id)
      .order("createdAt", { ascending: true });

    if (error) {
      throw error;
    }

    return data ? keysToCamelCase(data.map((d: any) => d.sb_documents)) : [];
  };
}

export const vehicleService = new VehicleService();
