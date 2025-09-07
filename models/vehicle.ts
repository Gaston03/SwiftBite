import { VehicleType } from './enums';
import {SBDocument} from './sb-document';

export interface Vehicle {
  id: string;
  plateNumber: string;
  type: VehicleType;
  createdAt: Date;
  updatedAt?: Date;
  
  documents?: SBDocument[];
}
