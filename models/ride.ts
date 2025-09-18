import { Address } from "./address";
import { Customer } from "./customer";
import { Deliverer } from "./deliverer";
import { RideStatus, VehicleType } from "./enums";

export interface Ride {
  id: string;
  customer: Customer;
  deliverer?: Deliverer;
  vehicleType: VehicleType;
  status: RideStatus;
  originAddress: Address;
  destinationAddress: Address;
  price: number;
  estimatedDuration?: string;
  distance?: number;
  createdAt: string;
  updatedAt?: string;
}
