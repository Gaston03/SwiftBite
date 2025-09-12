import { useAuth } from "@/hooks/use-auth";
import { useError } from "@/hooks/use-error";
import { Deliverer } from "@/models/deliverer";
import {
  CreateDelivererData,
  delivererService,
} from "@/services/deliverer-service";
import { createContext, useEffect, useState } from "react";

interface DelivererContextData {
  deliverer: Deliverer | null;
  loading: boolean;
  createDeliverer: (data: CreateDelivererData) => Promise<void>;
  updateDeliverer: (id: string, deliverer: Partial<Deliverer>) => Promise<void>;
  deleteDeliverer: (id: string) => Promise<void>;
}

export const DelivererContext = createContext<DelivererContextData>(
  {} as DelivererContextData
);

export const DelivererProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { handleError } = useError();
  const { userProfile } = useAuth();
  const [deliverer, setDeliverer] = useState<Deliverer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDeliverer = async () => {
      try {
        if (!userProfile) return;
        setLoading(true);
        const data = await delivererService.getDeliverer(userProfile.id);
        setDeliverer(data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    getDeliverer();
  }, [handleError, userProfile]);

  const createDeliverer = async (data: CreateDelivererData) => {
    try {
      await delivererService.createDeliverer(data);
    } catch (error) {
      handleError(error);
    }
  };

  const updateDeliverer = async (id: string, deliverer: Partial<Deliverer>) => {
    try {
      await delivererService.updateDeliverer(id, deliverer);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteDeliverer = async (id: string) => {
    try {
      await delivererService.deleteDeliverer(id);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <DelivererContext.Provider
      value={{
        deliverer,
        loading,
        createDeliverer,
        updateDeliverer,
        deleteDeliverer,
      }}
    >
      {children}
    </DelivererContext.Provider>
  );
};
