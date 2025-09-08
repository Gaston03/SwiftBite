import { View, StyleSheet, FlatList } from "react-native";
import { Stack } from "expo-router";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useCart } from "@/contexts/cart-context";
import { CartItemRow } from "@/components/customer/cart-item-row";
import { Button } from "@/components/shared/button";

export default function CartScreen() {
  const { items, total } = useCart();

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
              <Typography variant="subtitle">Total</Typography>
              <Typography variant="title">${total.toFixed(2)}</Typography>
            </View>
            <Button title="Proceed to Checkout" />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Typography variant="title">Your cart is empty</Typography>
          <Typography style={styles.emptySubtitle}>
            Add items from your favorite establishments to get started.
          </Typography>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 120, // Space for the footer
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptySubtitle: {
    marginTop: 8,
    color: '#666',
    textAlign: 'center',
  },
});
