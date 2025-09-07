import { Customer } from "@/models/customer";

export type CreateCustomerData = Omit<
  Customer,
  "id" | "createdAt" | "updatedAt" | "address" | "orders" | "paymentMethods"
>;

//TODO: Implement this class
class CustomerService {
  createCustomer = async (data: CreateCustomerData): Promise<void> => {};

  updateCustomer = async (
    id: string,
    customer: Partial<Customer>
  ): Promise<void> => {};

  deleteCustomer = async (id: string): Promise<void> => {};
  
  getCustomer = async (id: string): Promise<Customer | null> => {
    return null;
  };
}

export const customerService = new CustomerService();
