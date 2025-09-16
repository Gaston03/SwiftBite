import { useAuth } from "@/hooks/use-auth";
import { useError } from "@/hooks/use-error";
import { Customer } from "@/models/customer";
import {
  CreateCustomerData,
  customerService,
} from "@/services/customer-service";
import { createContext, useContext, useEffect, useState } from "react";
import { AddressProvider, AddressContext } from "./address-context";

interface CustomerContextData {
  customer: Customer | null;
  loading: boolean;
  createCustomer: (data: CreateCustomerData) => Promise<Customer | undefined>;
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
  const { handleError } = useError();
  const { userProfile } = useAuth();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const { addresses } = useContext(AddressContext);

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
  }, [handleError, userProfile]);

  useEffect(() => {
    if (customer && addresses) {
      setCustomer({ ...customer, address: addresses[0] });
    }
  }, [addresses]);

  const createCustomer = async (data: CreateCustomerData) => {
    setLoading(true)
    try {
      return await customerService.createCustomer(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false)
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

export const CustomerProviderWithAddress = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <AddressProvider>
    <CustomerProvider>{children}</CustomerProvider>
  </AddressProvider>
);