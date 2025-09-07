import { EstablishmentType } from "@/models/enums";
import { Establishment } from "@/models/establishment";

//TODO: Implement this class
export type CreateEstablishmentData = Omit<
  Establishment,
  "id" | "createdAt" | "updatedAt" | "address" | "products" | "orders"
>;

class EstablishmentService {
  createEstablishment = async (
    data: CreateEstablishmentData
  ): Promise<void> => {};

  updateEstablishment = async (
    id: string,
    customer: Partial<Establishment>
  ): Promise<void> => {};

  deleteEstablishment = async (id: string): Promise<void> => {};

  getEstablishmentById = async (id: string): Promise<Establishment | null> => {
    return null;
  };

  getPropularEstablishments = async (): Promise<Establishment[]> => {
    return [];
  };

  getEstablishmentsByType = async (
    type: EstablishmentType
  ): Promise<Establishment[]> => {
    return [];
  };
}

export const establishmentService = new EstablishmentService();
