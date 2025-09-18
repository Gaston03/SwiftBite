import { Customer } from "./customer";
import { Deliverer } from "./deliverer";
import { RideStatus, VehicleType } from "./enums";

export interface Ride {
  id: string;
  customer: Customer;
  deliverer?: Deliverer;
  vehicleType: VehicleType;
  status: RideStatus;
  originLatitude: number;
  originLongitude: number;
  originDescription: string;
  destinationLatitude: number;
  destinationLongitude: number;
  destinationDescription: string;
  price: number;
  estimatedDuration?: string;
  distance?: number;
  createdAt: string;
  updatedAt?: string;
}
