import { useAuth } from "@/hooks/use-auth";
import { useError } from "@/hooks/use-error";
import { UserRole } from "@/models/enums";
import { Order } from "@/models/order";
import { CreateOrderData, orderService } from "@/services/order-service";
import { createContext, useEffect, useState } from "react";

interface OrderContextData {
  orders: Order[];
  loading: boolean;
  placeOrder: (data: CreateOrderData) => Promise<Order | null>;
  updateOrder: (id: string, order: Partial<Order>) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  acceptOrder: (id: string) => Promise<void>;
  refuseOrder: (id: string) => Promise<void>;
  getOrderById: (id: string) => Promise<Order | null>;
}

export const OrderContext = createContext<OrderContextData>(
  {} as OrderContextData
);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleError } = useError();
  const { userProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (!userProfile) return;
        setLoading(true);
        let data: Order[] = [];
        if (userProfile.role === UserRole.CUSTOMER) {
          data = await orderService.getCustomerOrders(userProfile.id);
        } else if (userProfile.role === UserRole.DELIVERER) {
          data = await orderService.getDelivererOrders(userProfile.id);
        } else {
          data = await orderService.getEstablishmentOrders(userProfile.id);
        }
        setOrders(data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [handleError, userProfile]);

  const placeOrder = async (data: CreateOrderData) => {
    try {
      const newOrder = await orderService.placeOrder(data);
      setOrders((prev) => [...prev, newOrder]);
      return newOrder;
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const updateOrder = async (id: string, order: Partial<Order>) => {
    try {
      await orderService.updateOrder(id, order);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await orderService.deleteOrder(id);
    } catch (error) {
      handleError(error);
    }
  };

  const acceptOrder = async (id: string) => {
    try {
      await orderService.acceptOrder(id);
    } catch (error) {
      handleError(error);
    }
  };

  const refuseOrder = async (id: string) => {
    try {
      await orderService.refuseOrder(id);
    } catch (error) {
      handleError(error);
    }
  };

  const getOrderById = async (id: string) => {
    try {
      return await orderService.getOrderById(id);
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        placeOrder,
        updateOrder,
        deleteOrder,
        acceptOrder,
        refuseOrder,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
