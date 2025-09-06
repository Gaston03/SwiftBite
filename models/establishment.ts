import {Address} from './address';
import {Product} from './product';
import {Order} from './order';
import { EstablishmentStatus, EstablishmentType } from './enums';

export interface Establishment {
  id: string;
  name: string;
  type: EstablishmentType;
  openingHours: Record<string, number[]>;
  status: EstablishmentStatus;
  commission: number;
  rate: number;

  address?: Address;
  products?: Product[];
  orders?: Order[];
}
