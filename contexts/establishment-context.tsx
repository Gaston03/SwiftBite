import { EstablishmentType } from "@/models/enums";
import { Establishment } from "@/models/establishment";
import {
  CreateEstablishmentData,
  establishmentService,
} from "@/services/establishment-service";
import { handleError } from "@/utils/error-handler";
import { createContext, useEffect, useState } from "react";

interface EstablishmentContextData {
  establishments: Establishment[];
  popularEstablishments: Establishment[];
  loading: boolean;
  createEstablishment: (data: CreateEstablishmentData) => Promise<void>;
  updateEstablishment: (
    id: string,
    establishment: Partial<Establishment>
  ) => Promise<void>;
  deleteEstablishment: (id: string) => Promise<void>;
  getEstablishmentById: (id: string) => Promise<Establishment | null>;
  getEstablishmentsByType: (
    type: EstablishmentType
  ) => Promise<Establishment[]>;
  getAllEstablishments: () => Promise<void>;
}

export const EstablishmentContext = createContext<EstablishmentContextData>(
  {} as EstablishmentContextData
);

export const EstablishmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [popularEstablishments, setPopularEstablishments] = useState<
    Establishment[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPopularEstablishments = async () => {
      try {
        setLoading(true);
        const data = await establishmentService.getPropularEstablishments();
        setPopularEstablishments(data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    getPopularEstablishments();
  }, []);

  const createEstablishment = async (data: CreateEstablishmentData) => {
    try {
      await establishmentService.createEstablishment(data);
    } catch (error) {
      handleError(error);
    }
  };

  const updateEstablishment = async (
    id: string,
    establishment: Partial<Establishment>
  ) => {
    try {
      await establishmentService.updateEstablishment(id, establishment);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteEstablishment = async (id: string) => {
    try {
      await establishmentService.deleteEstablishment(id);
    } catch (error) {
      handleError(error);
    }
  };

  const getEstablishmentById = async (id: string) => {
    try {
      return await establishmentService.getEstablishmentById(id);
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const getAllEstablishments = async () => {
    try {
      setLoading(true);
      const data = await establishmentService.getAllEstablishments();
      setEstablishments(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getEstablishmentsByType = async (type: EstablishmentType) => {
    try {
      setLoading(true);
      const data = await establishmentService.getEstablishmentsByType(type);
      setEstablishments(data);
      return data;
    } catch (error) {
      handleError(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <EstablishmentContext.Provider
      value={{
        establishments,
        popularEstablishments,
        loading,
        createEstablishment,
        updateEstablishment,
        deleteEstablishment,
        getEstablishmentById,
        getEstablishmentsByType,
        getAllEstablishments,
      }}
    >
      {children}
    </EstablishmentContext.Provider>
  );
};
