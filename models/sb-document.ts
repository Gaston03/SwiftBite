import { DocumentType } from './enums';

export interface SBDocument {
  id: string;
  fileName: string;
  url: string;
  type: DocumentType;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
