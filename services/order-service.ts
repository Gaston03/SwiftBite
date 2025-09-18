import { Order } from "@/models/order";
import { supabase } from "@/utils/supabase";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/case-converter";
import { OrderStatus } from "@/models/enums";

// What we need to create a product line, including selected toppings
export interface CreateOrderProductLineData {
  productId: string;
  quantity: number;
  unitPrice: number;
  specialInstructions?: string;
  selectedToppings: string[]; // Array of topping IDs
}

// What we need to create a whole order
export type CreateOrderData = Omit<
  Order,
  | "id"
  | "status"
  | "createdAt"
  | "updatedAt"
  | "productLines"
  | "deliveringAddress"
> & {
  productLines: CreateOrderProductLineData[];
};

class OrderService {
  placeOrder = async (data: CreateOrderData): Promise<Order> => {
    const { productLines, ...orderData } = data;

    // 1. Create the order
    const { data: newOrder, error: orderError } = await supabase
      .from("orders")
      .insert(keysToSnakeCase({ ...orderData, status: OrderStatus.PENDING }))
      .select()
      .single();

    if (orderError) {
      throw orderError;
    }

    const orderId = newOrder.id;

    // 2. Create the product lines
    const productLinesToInsert = productLines.map((pl) => ({
      orderId: orderId,
      productId: pl.productId,
      quantity: pl.quantity,
      unitPrice: pl.unitPrice,
      totalPrice: pl.unitPrice * pl.quantity,
      specialInstructions: pl.specialInstructions,
    }));

    const { data: newProductLines, error: productLinesError } = await supabase
      .from("order_product_lines")
      .insert(keysToSnakeCase(productLinesToInsert))
      .select();

    if (productLinesError) {
      await supabase.from("orders").delete().eq("id", orderId);
      throw productLinesError;
    }

    // 3. Create the product line toppings
    const toppingsToInsert: { product_line_id: string; topping_id: string }[] =
      [];
    newProductLines.forEach((newPl, index) => {
      const selectedToppingIds = productLines[index].selectedToppings;
      selectedToppingIds.forEach((toppingId) => {
        toppingsToInsert.push({
          product_line_id: newPl.id,
          topping_id: toppingId,
        });
      });
    });

    if (toppingsToInsert.length > 0) {
      const { error: toppingsError } = await supabase
        .from("order_product_line_toppings")
        .insert(toppingsToInsert);

      if (toppingsError) {
        await supabase
          .from("order_product_lines")
          .delete()
          .eq("order_id", orderId);
        await supabase.from("orders").delete().eq("id", orderId);
        throw toppingsError;
      }
    }

    const completeOrder = await this.getOrderById(orderId);
    if (!completeOrder) {
      throw new Error("Failed to fetch the created order");
    }

    return completeOrder;
  };

  updateOrder = async (id: string, data: Partial<Order>): Promise<void> => {
    const { error } = await supabase
      .from("orders")
      .update(keysToSnakeCase(data))
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  acceptOrder = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("orders")
      .update({ status: OrderStatus.ACCEPTED })
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  refuseOrder = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("orders")
      .update({ status: OrderStatus.REFUSED })
      .eq("id", id);

    if (error) {
      throw error;
    }
  };

  deleteOrder = async (id: string): Promise<void> => {
    const { data: productLines, error: plError } = await supabase
      .from("order_product_lines")
      .select("id")
      .eq("order_id", id);

    if (plError) throw plError;

    if (productLines && productLines.length > 0) {
      const productLineIds = productLines.map((pl) => pl.id);

      const { error: toppingsError } = await supabase
        .from("order_product_line_toppings")
        .delete()
        .in("product_line_id", productLineIds);

      if (toppingsError) throw toppingsError;

      const { error: productLinesError } = await supabase
        .from("order_product_lines")
        .delete()
        .in("id", productLineIds);

      if (productLinesError) throw productLinesError;
    }

    const { error: orderError } = await supabase
      .from("orders")
      .delete()
      .eq("id", id);

    if (orderError) throw orderError;
  };

  getOrderById = async (id: string): Promise<Order | null> => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        "*, productLines:order_product_lines(*, product:products(*), selectedToppings:toppings(*))"
      )
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return keysToCamelCase(data);
  };

  getEstablishmentOrders = async (
    establishmentId: string
  ): Promise<Order[]> => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        "*, productLines:order_product_lines(*, product:products(*), selectedToppings:toppings(*))"
      )
      .eq("establishment_id", establishmentId);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data || []);
  };

  getCustomerOrders = async (customerId: string): Promise<Order[]> => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        "*, productLines:order_product_lines(*, product:products(*), selectedToppings:toppings(*))"
      )
      .eq("customer_id", customerId);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data || []);
  };

  getDelivererOrders = async (delivererId: string): Promise<Order[]> => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        "*, productLines:order_product_lines(*, product:products(*), selectedToppings:toppings(*))"
      )
      .eq("deliverer_id", delivererId);

    if (error) {
      throw error;
    }

    return keysToCamelCase(data || []);
  };
}

export const orderService = new OrderService();
