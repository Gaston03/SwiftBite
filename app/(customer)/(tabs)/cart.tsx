import { View, StyleSheet, FlatList } from "react-native";
import { Stack } from "expo-router";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useCart } from "@/contexts/cart-context";
import { CartItemRow } from "@/components/customer/cart-item-row";
import { Button } from "@/components/shared/button";
import { useTheme } from "@/hooks/use-theme";

export default function CartScreen() {
  const { items, total } = useCart();
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;

  const styles = StyleSheet.create({
    list: {
      paddingBottom: 120, // Space for the footer
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: sizes.padding,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.tertiary,
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: sizes.padding,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: sizes.padding,
    },
    emptySubtitle: {
      marginTop: sizes.base,
      color: colors.gray,
      textAlign: 'center',
    },
  });

  return (
    <Screen>
      <Stack.Screen options={{ title: "My Cart" }} />
      {items.length > 0 ? (
        <>
          <FlatList
            data={items}
            renderItem={({ item }) => <CartItemRow item={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Typography variant="h3">Total</Typography>
              <Typography variant="h2">${total.toFixed(2)}</Typography>
            </View>
            <Button title="Proceed to Checkout" />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Typography variant="h2">Your cart is empty</Typography>
          <Typography style={styles.emptySubtitle}>
            Add items from your favorite establishments to get started.
          </Typography>
        </View>
      )}
    </Screen>
  );
}
