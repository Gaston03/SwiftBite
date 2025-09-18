import { useAuth } from "@/hooks/use-auth";
import { useError } from "@/hooks/use-error";
import { Address } from "@/models/address";
import { CreateAddressData, addressService } from "@/services/address-service";
import { createContext, useEffect, useState } from "react";

interface AddressContextData {
  addresses: Address[];
  loading: boolean;
  createAddress: (data: CreateAddressData) => Promise<Address | undefined>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
}

export const AddressContext = createContext<AddressContextData>(
  {} as AddressContextData
);

export const AddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { handleError } = useError();
  const { userProfile } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshAddress = async () => {
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

  useEffect(() => {
    const getAddress = async () => {
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

    getAddress();
  }, [handleError, userProfile]);

  const createAddress = async (data: CreateAddressData) => {
    setLoading(true);
    try {
      const newAddress = await addressService.createAddress(data);
      await refreshAddress();
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

  return (
    <AddressContext.Provider
      value={{
        addresses,
        loading,
        createAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
