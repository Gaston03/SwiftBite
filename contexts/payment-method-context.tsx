import { useAuth } from "@/hooks/use-auth";
import { useError } from "@/hooks/use-error";
import { PaymentMethod } from "@/models/payment-method";
import {
  CreatePaymentMethodData,
  paymentMethodService,
} from "@/services/payment-method-service";
import { createContext, useEffect, useState } from "react";

interface PaymentMethodContextData {
  paymentMethods: PaymentMethod[];
  loading: boolean;
  createPaymentMethod: (data: CreatePaymentMethodData) => Promise<void>;
  updatePaymentMethod: (
    id: string,
    paymentMethod: Partial<PaymentMethod>
  ) => Promise<void>;
  deletePaymentMethod: (id: string) => Promise<void>;
}

export const PaymentMethodContext = createContext<PaymentMethodContextData>(
  {} as PaymentMethodContextData
);

export const PaymentMethodProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { handleError } = useError();
  const { userProfile } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPaymentMethods = async () => {
      try {
        if (!userProfile) return;
        setLoading(true);
        const data = await paymentMethodService.getPaymentMethodsByCustomerId(
          userProfile.id
        );
        setPaymentMethods(data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    getPaymentMethods();
  }, [handleError, userProfile]);

  const createPaymentMethod = async (data: CreatePaymentMethodData) => {
    try {
      const newPaymentMethod = await paymentMethodService.createPaymentMethod(
        data
      );
      setPaymentMethods((prev) => [...prev, newPaymentMethod]);
    } catch (error) {
      handleError(error);
    }
  };

  const updatePaymentMethod = async (
    id: string,
    paymentMethod: Partial<PaymentMethod>
  ) => {
    try {
      await paymentMethodService.updatePaymentMethod(id, paymentMethod);
    } catch (error) {
      handleError(error);
    }
  };

  const deletePaymentMethod = async (id: string) => {
    try {
      await paymentMethodService.deletePaymentMethod(id);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <PaymentMethodContext.Provider
      value={{
        paymentMethods,
        loading,
        createPaymentMethod,
        updatePaymentMethod,
        deletePaymentMethod,
      }}
    >
      {children}
    </PaymentMethodContext.Provider>
  );
};