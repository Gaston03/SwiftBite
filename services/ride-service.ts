import { Ride } from "@/models/ride";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";
import { RideStatus, VehicleType } from "@/models/enums";

export type CreateRideData = {
  customerId: string;
  vehicleType: VehicleType;
  originLatitude: number;
  originLongitude: number;
  originDescription: string;
  destinationLatitude: number;
  destinationLongitude: number;
  destinationDescription: string;
  price: number;
  estimatedDuration?: string;
  distance?: number;
};

class RideService {
  createRide = async (data: CreateRideData): Promise<Ride> => {
    const { data: newRide, error } = await supabase
      .from("rides")
      .insert(keysToSnakeCase({ ...data, status: RideStatus.PENDING }))
      .select(
        `*,
        customer:customers(*),
        deliverer:deliverers(*)
      `
      )
      .single();

    if (error) {
      throw error;
    }

    return keysToCamelCase(newRide);
  };

  updateRide = async (id: string, data: Partial<Ride>): Promise<void> => {
    const { error } = await supabase
      .from("rides")
      .update(keysToSnakeCase(data))
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  getRideById = async (id: string): Promise<Ride | null> => {
    const { data, error } = await supabase
      .from("rides")
      .select(
        `*,
        customer:customers(*),
        deliverer:deliverers(*)
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    return keysToCamelCase(data);
  };

  getCustomerRides = async (customerId: string): Promise<Ride[]> => {
    const { data, error } = await supabase
      .from("rides")
      .select(
        `*,
        customer:customers(*),
        deliverer:deliverers(*)
      `
      )
      .eq("customer_id", customerId);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data) || [];
  };

  getDelivererRides = async (delivererId: string): Promise<Ride[]> => {
    const { data, error } = await supabase
      .from("rides")
      .select(
        `*,
        customer:customers(*),
        deliverer:deliverers(*)
      `
      )
      .eq("deliverer_id", delivererId);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data) || [];
  };
}

export const rideService = new RideService();
