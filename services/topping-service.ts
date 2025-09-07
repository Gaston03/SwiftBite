import { Topping } from "@/models/topping";

export type CreateToppingData = Omit<Topping, "id" | "createdAt" | "updatedAt">;

//TODO: Implement this class
class ToppingService {
  createTopping = async (data: CreateToppingData): Promise<void> => {};

  updateTopping = async (
    id: string,
    data: Partial<Topping>
  ): Promise<void> => {};

  deleteTopping = async (id: string): Promise<void> => {};

  getToppingById = async (id: string): Promise<Topping | null> => {
    return null;
  };

  getToppingsByProductId = async (productId: string): Promise<Topping[]> => {
    return [];
  };
}

export const toppingService = new ToppingService();
