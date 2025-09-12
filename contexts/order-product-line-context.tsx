import { useError } from "@/hooks/use-error";
import { OrderProductLine } from "@/models/order-product-line";
import {
  CreateOrderProductLineData,
  orderProductLineService,
} from "@/services/order-product-line-service";
import { createContext, useCallback, useState } from "react";

interface OrderProductLineContextData {
  productLines: OrderProductLine[];
  loading: boolean;
  createProductLine: (data: CreateOrderProductLineData) => Promise<void>;
  deleteProductLine: (id: string) => Promise<void>;
  getProductLinesByOrderId: (orderId: string) => Promise<void>;
}

export const OrderProductLineContext = createContext<OrderProductLineContextData>(
  {} as OrderProductLineContextData
);

export const OrderProductLineProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { handleError } = useError();
  const [productLines, setProductLines] = useState<OrderProductLine[]>([]);
  const [loading, setLoading] = useState(true);

  const createProductLine = async (data: CreateOrderProductLineData) => {
    try {
      await orderProductLineService.createOrderProductLine(data);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteProductLine = async (id: string) => {
    try {
      await orderProductLineService.deleteOrderProductLine(id);
    } catch (error) {
      handleError(error);
    }
  };

  const getProductLinesByOrderId = useCallback(
    async (orderId: string) => {
      try {
        setLoading(true);
        const data = await orderProductLineService.getProductLinesByOrderId(
          orderId
        );
        setProductLines(data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  return (
    <OrderProductLineContext.Provider
      value={{
        productLines,
        loading,
        createProductLine,
        deleteProductLine,
        getProductLinesByOrderId,
      }}
    >
      {children}
    </OrderProductLineContext.Provider>
  );
};
