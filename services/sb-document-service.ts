import { SBDocument } from "@/models/sb-document";

export type CreateSBDocumentData = Omit<
  SBDocument,
  "id" | "createdAt" | "updatedAt" | "deleteAt"
>;

//TODO: Implement this class
class SBDocumentService {
  createSBDocument = async (
    data: CreateSBDocumentData
  ): Promise<void> => {};

  updateSBDocument = async (
    id: string,
    document: Partial<SBDocument>
  ): Promise<void> => {};

  deleteSBDocument = async (id: string): Promise<void> => {};

  getSBDocumentById = async (id: string): Promise<SBDocument | null> => {
    return null;
  };

  getDocumentsByOwnerId = async (ownerId: string): Promise<Document[]> => {
    return [];
  };

}

export const documentService = new SBDocumentService();
