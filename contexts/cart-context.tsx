import { Product } from "@/models/product";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CartItem {
  id: string; // Unique ID for the cart item (e.g., product.id + sorted topping ids)
  product: Product;
  quantity: number;
  selectedToppings: Record<string, boolean>;
  price: number; // Price for a single item with toppings
}

interface CartContextData {
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

const CartContext = createContext<CartContextData | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

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
    console.log("===== selectedToppings: ", selectedToppings);
    console.log("===== productToppings: ", product.toppings);
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
    console.log("===== toppingPrice: ", toppingPrice);

    const price = product.price + toppingPrice;

    // Create a unique ID based on product and toppings to handle same product with different toppings
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
        console.log("=== newItem: ", newItem);
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

  return (
    <CartContext.Provider
      value={{
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
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
