import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CartItem, useCart } from "@/contexts/cart-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/use-theme";
import { Typography } from "../shared/typography";

type CartItemRowProps = {
  item: CartItem;
};

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateItemQuantity } = useCart();
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: sizes.padding,
    },
    quantityContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: sizes.padding,
    },
    quantityText: {
      marginHorizontal: sizes.base,
    },
    infoContainer: {
      flex: 1,
    },
    description: {
      color: colors.gray,
    },
    price: {
      marginLeft: "auto",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.quantityContainer}>
        <Typography>{item.quantity}x</Typography>
      </View>
      <View style={styles.infoContainer}>
        <Typography variant="h4">{item.product.name}</Typography>
        <Typography style={styles.description} numberOfLines={1}>
          {Object.keys(item.selectedToppings)
            .filter((toppingId) => item.selectedToppings[toppingId])
            .map(
              (toppingId) =>
                item.product.toppings?.find((t) => t.id === toppingId)?.name
            )
            .join(", ")}
        </Typography>
      </View>
      <Typography variant="h4" style={styles.price}>
        ${(item.price * item.quantity).toFixed(2)}
      </Typography>
      <TouchableOpacity
        onPress={() => updateItemQuantity(item.id, item.quantity - 1)}
      >
        <Ionicons name="remove-circle-outline" size={28} color={colors.gray} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => updateItemQuantity(item.id, item.quantity + 1)}
      >
        <Ionicons name="add-circle" size={28} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}
