import { SBDocumentContext } from "@/contexts/sb-document-context";
import { useContext } from "react";

export const useSBDocument = () => {
  const context = useContext(SBDocumentContext);
  if (context === undefined) {
    throw new Error("useSBDocument must be used within a SBDocumentProvider");
  }
  return context;
}