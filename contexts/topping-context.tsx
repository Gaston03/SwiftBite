import { Topping } from "@/models/topping";
import {
  CreateToppingData,
  toppingService,
} from "@/services/topping-service";
import { handleError } from "@/utils/error-handler";
import { createContext, useState } from "react";

interface ToppingContextData {
  toppings: Topping[];
  loading: boolean;
  createTopping: (data: CreateToppingData) => Promise<void>;
  updateTopping: (id: string, topping: Partial<Topping>) => Promise<void>;
  deleteTopping: (id: string) => Promise<void>;
  getToppingById: (id: string) => Promise<Topping | null>;
  getToppingsByProductId: (productId: string) => Promise<void>;
}

export const ToppingContext = createContext<ToppingContextData>(
  {} as ToppingContextData
);

export const ToppingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [loading, setLoading] = useState(true);

  const createTopping = async (data: CreateToppingData) => {
    try {
      await toppingService.createTopping(data);
    } catch (error) {
      handleError(error);
    }
  };

  const updateTopping = async (id: string, topping: Partial<Topping>) => {
    try {
      await toppingService.updateTopping(id, topping);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteTopping = async (id: string) => {
    try {
      await toppingService.deleteTopping(id);
    } catch (error) {
      handleError(error);
    }
  };

  const getToppingById = async (id: string) => {
    try {
      return await toppingService.getToppingById(id);
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const getToppingsByProductId = async (productId: string) => {
    try {
      setLoading(true);
      const data = await toppingService.getToppingsByProductId(productId);
      setToppings(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToppingContext.Provider
      value={{
        toppings,
        loading,
        createTopping,
        updateTopping,
        deleteTopping,
        getToppingById,
        getToppingsByProductId,
      }}
    >
      {children}
    </ToppingContext.Provider>
  );
};
