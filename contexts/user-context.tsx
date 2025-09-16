import { useAuth } from "@/hooks/use-auth";
import { useError } from "@/hooks/use-error";
import { Address } from "@/models/address";
import { Customer } from "@/models/customer";
import {
  CreateAddressData,
  addressService,
} from "@/services/address-service";
import {
  CreateCustomerData,
  customerService,
} from "@/services/customer-service";
import {
  CreatePaymentMethodData,
  paymentMethodService,
} from "@/services/payment-method-service";
import { createContext, useEffect, useState } from "react";
import { PaymentMethod } from "@/models/payment-method";

interface UserContextData {
  customer: Customer | null;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  loading: boolean;
  createCustomer: (data: CreateCustomerData) => Promise<Customer | undefined>;
  updateCustomer: (id: string, customer: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  createAddress: (data: CreateAddressData) => Promise<Address | undefined>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  createPaymentMethod: (
    data: CreatePaymentMethodData
  ) => Promise<PaymentMethod | undefined>;
  deletePaymentMethod: (id: string) => Promise<void>;
  setDefaultPaymentMethod: (id: string) => Promise<void>;
}

export const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleError } = useError();
  const { userProfile } = useAuth();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
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
  }, [handleError, userProfile]);

  useEffect(() => {
    const getAddresses = async () => {
      try {
        if (!userProfile) return;
        setLoading(true);
        const data = await addressService.getAddressesByCustomerId(
          userProfile.id
        );
        setAddresses(data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    getAddresses();
  }, [handleError, userProfile]);

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

  useEffect(() => {
    if (customer && addresses) {
      setCustomer({ ...customer, address: addresses[0] });
    }
  }, [addresses, customer]);

  const createCustomer = async (data: CreateCustomerData) => {
    setLoading(true);
    try {
      return await customerService.createCustomer(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
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

  const createAddress = async (data: CreateAddressData) => {
    setLoading(true);
    try {
      const newAddress = await addressService.createAddress(data);
      setAddresses([...addresses, newAddress]);
      return newAddress;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (id: string, address: Partial<Address>) => {
    try {
      await addressService.updateAddress(id, address);
      setAddresses(
        addresses.map((a) => (a.id === id ? { ...a, ...address } : a))
      );
    } catch (error) {
      handleError(error);
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      await addressService.deleteAddress(id);
      setAddresses(addresses.filter((a) => a.id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  const createPaymentMethod = async (data: CreatePaymentMethodData) => {
    setLoading(true);
    try {
      const newPaymentMethod = await paymentMethodService.createPaymentMethod(
        data
      );
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
      return newPaymentMethod;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePaymentMethod = async (id: string) => {
    try {
      await paymentMethodService.deletePaymentMethod(id);
      setPaymentMethods(paymentMethods.filter((p) => p.id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  const setDefaultPaymentMethod = async (id: string) => {
    try {
      if (!customer) return;
      await paymentMethodService.setDefaultPaymentMethod(id, customer.id);
      setPaymentMethods(
        paymentMethods.map((p) => ({ ...p, isDefault: p.id === id }))
      );
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        customer,
        addresses,
        paymentMethods,
        loading,
        createCustomer,
        updateCustomer,
        deleteCustomer,
        createAddress,
        updateAddress,
        deleteAddress,
        createPaymentMethod,
        deletePaymentMethod,
        setDefaultPaymentMethod,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
