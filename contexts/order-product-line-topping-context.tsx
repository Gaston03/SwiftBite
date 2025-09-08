import { OrderProductLineTopping } from "@/models/order-product-line-topping";
import { orderProductLineToppingService } from "@/services/order-product-line-topping-service";
import { handleError } from "@/utils/error-handler";
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