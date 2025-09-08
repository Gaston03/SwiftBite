import { Address } from "./address";
import { EstablishmentStatus, EstablishmentType } from "./enums";
import { Order } from "./order";
import { Product } from "./product";

export interface Establishment {
  id: string;
  name: string;
  imageUrl: string;
  type: EstablishmentType;
  openingHours: Record<string, number[]>;
  status: EstablishmentStatus;
  deliveryFee: number;
  rate: number;
  deliveryTime: string;
  createdAt: Date;
  updatedAt?: Date;

  address?: Address;
  products?: Product[];
  orders?: Order[];
}
