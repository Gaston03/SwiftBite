import { useAuth } from "@/hooks/use-auth";
import { useError } from "@/hooks/use-error";
import { UserRole } from "@/models/enums";
import { Order } from "@/models/order";
import {
  CreateOrderData,
  CreateOrderProductLineData,
  orderService,
} from "@/services/order-service";
import { Product } from "@/models/product";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const CUSTOMER_ONGOING_ORDER_KEY = "customer-ongoing-order"
const DELIVERER_ONGOING_ORDER_KEY = "deliverer-ongoing-order"

export interface CartItem {
  id: string; // Unique ID for the cart item (e.g., product.id + sorted topping ids)
  product: Product;
  quantity: number;
  selectedToppings: Record<string, boolean>;
  price: number; // Price for a single item with toppings
}

interface OrderContextData {
  orders: Order[];
  loading: boolean;
  placeOrder: (
    deliveryFee: number,
    totalPrice: number,
    deliveringAddressId: string,
    establishmentId: string,
    estimatedDeliveryTime: string
  ) => Promise<Order | undefined>;
  updateOrder: (id: string, order: Partial<Order>) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  acceptOrder: (id: string) => Promise<void>;
  refuseOrder: (id: string) => Promise<void>;
  getOrderById: (id: string) => Promise<Order | null>;
  fetchOrders: () => Promise<void>;
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    selectedToppings: Record<string, boolean>
  ) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export const OrderContext = createContext<OrderContextData>(
  {} as OrderContextData
);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { handleError } = useError();
  const { userProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const fetchOrders = useCallback(async () => {
    try {
      if (!userProfile) return;
      setLoading(true);
      let data: Order[] = [];
      if (userProfile.role === UserRole.CUSTOMER) {
        data = await orderService.getCustomerOrders(userProfile.id);
      } else if (userProfile.role === UserRole.DELIVERER) {
        data = await orderService.getDelivererOrders(userProfile.id);
      } else {
        data = await orderService.getEstablishmentOrders(userProfile.id);
      }
      setOrders(data);
    } catch (error) {
      console.log('error', error)
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [handleError, userProfile]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    const newTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const newItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    setTotal(newTotal);
    setItemCount(newItemCount);
  }, [items]);

  const addToCart = (
    product: Product,
    quantity: number,
    selectedToppings: Record<string, boolean>
  ) => {
    const toppingPrice = Object.keys(selectedToppings).reduce(
      (sum, toppingId) => {
        if (selectedToppings[toppingId]) {
          const topping = product.toppings?.find((t) => t.id === toppingId);
          return sum + (topping?.price || 0);
        }
        return sum;
      },
      0
    );

    const price = product.price + toppingPrice;

    const toppingIds = Object.keys(selectedToppings)
      .filter((id) => selectedToppings[id])
      .sort()
      .join("-");
    const id = `${product.id}-${toppingIds || "base"}`;

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id,
          product,
          quantity,
          selectedToppings,
          price,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    setItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === itemId
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const placeOrder = async (
    deliveryFee: number,
    totalPrice: number,
    deliveringAddressId: string,
    establishmentId: string,
    estimatedDeliveryTime: string
  ) => {
    if (!userProfile) return;
    setLoading(true);
    try {
      const productLines: CreateOrderProductLineData[] = items.map((item) => {
        const selectedToppingIds = Object.keys(item.selectedToppings).filter(
          (toppingId) => item.selectedToppings[toppingId]
        );

        return {
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.price,
          selectedToppings: selectedToppingIds,
        };
      });

      const orderData: CreateOrderData = {
        customerId: userProfile.id,
        establishmentId,
        deliveryFee,
        totalPrice,
        deliveringAddressId,
        productLines,
        estimatedDeliveryTime,
      };

      const newOrder = await orderService.placeOrder(orderData);
      await fetchOrders();
      clearCart();
      return newOrder;
    } catch (error) {
      console.log('error', error)
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id: string, order: Partial<Order>) => {
    try {
      await orderService.updateOrder(id, order);
      await fetchOrders();
    } catch (error) {
      handleError(error);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await orderService.deleteOrder(id);
      await fetchOrders();
    } catch (error) {
      handleError(error);
    }
  };

  const acceptOrder = async (id: string) => {
    try {
      await orderService.acceptOrder(id);
      await fetchOrders();
    } catch (error) {
      handleError(error);
    }
  };

  const refuseOrder = async (id: string) => {
    try {
      await orderService.refuseOrder(id);
      await fetchOrders();
    } catch (error) {
      handleError(error);
    }
  };

  const getOrderById = async (id: string) => {
    try {
      return await orderService.getOrderById(id);
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        placeOrder,
        updateOrder,
        deleteOrder,
        acceptOrder,
        refuseOrder,
        getOrderById,
        fetchOrders,
        items,
        addToCart,
        updateItemQuantity,
        removeItem,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within a OrderProvider");
  }
  return context;
};
