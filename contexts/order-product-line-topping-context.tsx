import { useError } from "@/hooks/use-error";
import { OrderProductLineTopping } from "@/models/order-product-line-topping";
import { orderProductLineToppingService } from "@/services/order-product-line-topping-service";
import { createContext, useState } from "react";

interface OrderProductLineToppingContextData {
  loading: boolean;
  createProductLineTopping: (data: OrderProductLineTopping) => Promise<void>;
  deleteProductLineTopping: (
    orderProductLineId: string,
    toppingId: string
  ) => Promise<void>;
}

export const OrderProductLineToppingContext =
  createContext<OrderProductLineToppingContextData>(
    {} as OrderProductLineToppingContextData
  );

export const OrderProductLineToppingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { handleError } = useError();
  const [loading, setLoading] = useState(true);

  const createProductLineTopping = async (data: OrderProductLineTopping) => {
    try {
      setLoading(true);
      await orderProductLineToppingService.createOrderProductLineTopping(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProductLineTopping = async (
    orderProductLineId: string,
    toppingId: string
  ) => {
    try {
      setLoading(true);
      await orderProductLineToppingService.deleteOrderProductLineTopping(
        orderProductLineId,
        toppingId
      );
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderProductLineToppingContext.Provider
      value={{
        loading,
        createProductLineTopping,
        deleteProductLineTopping,
      }}
    >
      {children}
    </OrderProductLineToppingContext.Provider>
  );
};