import { useAuth } from "@/hooks/use-auth";
import { Customer } from "@/models/customer";
import {
  CreateCustomerData,
  customerService,
} from "@/services/customer-service";
import { handleError } from "@/utils/error-handler";
import { createContext, useEffect, useState } from "react";

interface CustomerContextData {
  customer: Customer | null;
  loading: boolean;
  createCustomer: (data: CreateCustomerData) => Promise<void>;
  updateCustomer: (id: string, customer: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
}

export const CustomerContext = createContext<CustomerContextData>(
  {} as CustomerContextData
);

export const CustomerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userProfile } = useAuth();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCustomer = async () => {
      try {
        if (!userProfile) return;
        setLoading(true);
        const data = await customerService.getCustomer(userProfile.id);
        setCustomer(data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    getCustomer();
  }, [userProfile]);

  const createCustomer = async (data: CreateCustomerData) => {
    try {
      await customerService.createCustomer(data);
    } catch (error) {
      handleError(error);
    }
  };

  const updateCustomer = async (id: string, customer: Partial<Customer>) => {
    try {
      await customerService.updateCustomer(id, customer);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      await customerService.deleteCustomer(id);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        loading,
        createCustomer,
        updateCustomer,
        deleteCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};