import { SBDocument } from "@/models/sb-document";
import {
  CreateSBDocumentData,
  sbDocumentService,
} from "@/services/sb-document-service";
import { handleError } from "@/utils/error-handler";
import { createContext, useState } from "react";

interface SBDocumentContextData {
  documents: SBDocument[];
  loading: boolean;
  createDocument: (data: CreateSBDocumentData) => Promise<void>;
  updateDocument: (id: string, document: Partial<SBDocument>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  getDocumentById: (id: string) => Promise<SBDocument | null>;
  getDelivererDocuments: (ownerId: string) => Promise<void>;
}

export const SBDocumentContext = createContext<SBDocumentContextData>(
  {} as SBDocumentContextData
);

export const SBDocumentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [documents, setDocuments] = useState<SBDocument[]>([]);
  const [loading, setLoading] = useState(true);

  const createDocument = async (data: CreateSBDocumentData) => {
    try {
      await sbDocumentService.createSBDocument(data);
    } catch (error) {
      handleError(error);
    }
  };

  const updateDocument = async (
    id: string,
    document: Partial<SBDocument>
  ) => {
    try {
      await sbDocumentService.updateSBDocument(id, document);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      await sbDocumentService.deleteSBDocument(id);
    } catch (error) {
      handleError(error);
    }
  };

  const getDocumentById = async (id: string) => {
    try {
      return await sbDocumentService.getSBDocumentById(id);
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const getDelivererDocuments = async (ownerId: string) => {
    try {
      setLoading(true);
      const data = await sbDocumentService.getDelivererDocuments(ownerId);
      setDocuments(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SBDocumentContext.Provider
      value={{
        documents,
        loading,
        createDocument,
        updateDocument,
        deleteDocument,
        getDocumentById,
        getDelivererDocuments,
      }}
    >
      {children}
    </SBDocumentContext.Provider>
  );
};
