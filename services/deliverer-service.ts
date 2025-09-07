import { Deliverer } from "@/models/deliverer";

export type CreateDelivererData = Omit<
  Deliverer,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "address"
  | "orders"
  | "paymentMethods"
  | "vehicle"
  | "documents"
>;

//TODO: Implement this class
class DelivererService {
  createDeliverer = async (
    data: CreateDelivererData
  ): Promise<void> => {};

  updateDeliverer = async (
    id: string,
    deliverer: Partial<Deliverer>
  ): Promise<void> => {};

  deleteDeliverer = async (id: string): Promise<void> => {};

  getDeliverer = async (id: string): Promise<Deliverer | null> => {
    return null;
  };
}

export const delivererService = new DelivererService();
