import { EstablishmentType } from "@/models/enums";
import { Establishment } from "@/models/establishment";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";

export type CreateEstablishmentData = Omit<
  Establishment,
  "id" | "createdAt" | "updatedAt" | "address" | "products" | "orders"
>;

class EstablishmentService {
  createEstablishment = async (
    data: CreateEstablishmentData
  ): Promise<void> => {
    const { error } = await supabase
      .from("establishments")
      .insert(keysToSnakeCase(data));

    if (error) {
      throw error;
    }
  };

  updateEstablishment = async (
    id: string,
    establishment: Partial<Establishment>
  ): Promise<void> => {
    const { error } = await supabase
      .from("establishments")
      .update(keysToSnakeCase(establishment))
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  deleteEstablishment = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("establishments")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  getEstablishmentById = async (id: string): Promise<Establishment | null> => {
    const { data, error } = await supabase
      .from("establishments")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return keysToCamelCase(data);
  };

  getPropularEstablishments = async (): Promise<Establishment[]> => {
    const { data, error } = await supabase
      .from("establishments")
      .select("*")
      .order("rate", { ascending: false })
      .limit(10);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data || []);
  };

  getAllEstablishments = async (): Promise<Establishment[]> => {
    const { data, error } = await supabase.from("establishments").select("*");

    if (error) {
      throw error;
    }

    return keysToCamelCase(data || []);
  };

  getEstablishmentsByType = async (
    type: EstablishmentType
  ): Promise<Establishment[]> => {
    const { data, error } = await supabase
      .from("establishments")
      .select("*")
      .eq("type", type);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data || []);
  };
}

export const establishmentService = new EstablishmentService();
