import { PaymentMethod } from "@/models/payment-method";

export type CreatePaymentMethodData = Omit<
  PaymentMethod,
  "id" | "createdAt" | "updatedAt"
>;

//TODO: Implement this class
class PaymentMethodService {
  createPaymentMethod = async (
    data: CreatePaymentMethodData
  ): Promise<void> => {};

  updatePaymentMethod = async (
    id: string,
    data: Partial<PaymentMethod>
  ): Promise<void> => {};

  deletePaymentMethod = async (id: string): Promise<void> => {};

  getPaymentMethodById = async (id: string): Promise<PaymentMethod | null> => {
    return null;
  };

  getPaymentMethodsByOwnerId = async (
    ownerId: string
  ): Promise<PaymentMethod[]> => {
    return [];
  };
}

export const paymentMethodService = new PaymentMethodService();
