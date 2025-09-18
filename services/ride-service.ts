import { Ride } from "@/models/ride";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";
import { RideStatus, VehicleType } from "@/models/enums";

export type CreateRideData = {
  customerId: string;
  vehicleType: VehicleType;
  originAddressId: string;
  destinationAddressId: string;
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
        deliverer:deliverers(*),
        originAddress:addresses!rides_origin_address_id_fkey(*),
        destinationAddress:addresses!rides_destination_address_id_fkey(*)
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
        deliverer:deliverers(*),
        originAddress:addresses!rides_origin_address_id_fkey(*),
        destinationAddress:addresses!rides_destination_address_id_fkey(*)
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
        deliverer:deliverers(*),
        originAddress:addresses!rides_origin_address_id_fkey(*),
        destinationAddress:addresses!rides_destination_address_id_fkey(*)
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
        deliverer:deliverers(*),
        originAddress:addresses!rides_origin_address_id_fkey(*),
        destinationAddress:addresses!rides_destination_address_id_fkey(*)
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
