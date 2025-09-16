import { Card } from "@/components/shared/card";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useOrder } from "@/hooks/use-order";
import { useTheme } from "@/hooks/use-theme";
import { Order } from "@/models/order";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

export default function OrdersScreen() {
  const { orders, loading } = useOrder();
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: sizes.padding,
    },
    title: {
      marginBottom: sizes.padding,
    },
    orderContainer: {
      marginBottom: sizes.base,
    },
    orderHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: sizes.base,
    },
  });

  const handleOrderPress = (order: Order) => {
    router.push(`/(customer)/order/${order.id}`);
  };

  if (loading) {
    return (
      <Screen>
        <View style={styles.container}>
          <Typography>Loading...</Typography>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Typography variant="h1" style={styles.title}>
          My Orders
        </Typography>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleOrderPress(item)}>
              <Card style={styles.orderContainer}>
                <View style={styles.orderHeader}>
                  <Typography variant="h3">
                    Order #{item.id.substring(0, 8)}
                  </Typography>
                  <Typography>{item.status}</Typography>
                </View>
                <Typography>Total: ${item.totalPrice.toFixed(2)}</Typography>
              </Card>
            </Pressable>
          )}
        />
      </View>
    </Screen>
  );
}
