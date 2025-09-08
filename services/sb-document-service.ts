import { SBDocument } from "@/models/sb-document";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";

export type CreateSBDocumentData = Omit<
  SBDocument,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;

class SBDocumentService {
  createSBDocument = async (
    data: CreateSBDocumentData
  ): Promise<void> => {
    const { error } = await supabase
      .from("sb_documents")
      .insert(keysToSnakeCase(data));

    if (error) {
      throw error;
    }
  };

  updateSBDocument = async (
    id: string,
    document: Partial<SBDocument>
  ): Promise<void> => {
    const { error } = await supabase
      .from("sb_documents")
      .update(keysToSnakeCase(document))
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  deleteSBDocument = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("sb_documents")
      .update({ deleted_at: new Date() })
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  getSBDocumentById = async (id: string): Promise<SBDocument | null> => {
    const { data, error } = await supabase
      .from("sb_documents")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (error) {
      throw error;
    }

    return keysToCamelCase(data);
  };

  getDelivererDocuments = async (delivererId: string): Promise<SBDocument[]> => {
    const { data, error } = await supabase
      .from("deliverer_documents")
      .select("sb_documents(*)")
      .eq("deliverer_id", delivererId)
      .is("sb_documents.deleted_at", null);

    if (error) {
      throw error;
    }

    return data
      ? keysToCamelCase(data.map((d: any) => d.sb_documents))
      : [];
  };
}

export const sbDocumentService = new SBDocumentService();
