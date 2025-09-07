
export interface Topping {
  id: string;
  productId: string;
  name: string;
  price: number;
  isRequired: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
