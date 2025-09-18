import { useAddress } from "@/hooks/use-address";
import { useAuth } from "@/hooks/use-auth";
import { useError } from "@/hooks/use-error";
import { Customer } from "@/models/customer";
import {
  CreateCustomerData,
  customerService,
} from "@/services/customer-service";
import { createContext, useEffect, useState } from "react";

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
  const { addresses } = useAddress();

  useEffect(() => {
    const getCustomer = async () => {
      try {
        if (!userProfile) return;
        setLoading(true);
        const data = await customerService.getCustomer(userProfile.id);
        setCustomer(data);
      } catch (error) {
        console.log("error", error);
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    getCustomer();
  }, [handleError, userProfile]);

  useEffect(() => {
    if (customer && addresses) {
      setCustomer(
        (prev) =>
          ({
            ...prev,
        address: addresses[0]
      } as Customer));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses]);

  const createCustomer = async (data: CreateCustomerData) => {
    setLoading(true);
    try {
      return await customerService.createCustomer(data);
    } catch (error) {
      console.log("error", error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (id: string, newCustomer: Partial<Customer>) => {
    setLoading(true);
    try {
      await customerService.updateCustomer(id, newCustomer);

      const updatedCustomer: Customer = {
        ...customer,
        ...newCustomer,
      } as Customer;
      setCustomer(updatedCustomer);
    } catch (error) {
      console.log("error", error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      await customerService.deleteCustomer(id);
    } catch (error) {
      console.log("error", error);
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

// export const CustomerProviderWithAddress = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => (
//   <AddressProvider>
//     <CustomerProvider>{children}</CustomerProvider>
//   </AddressProvider>
// );
