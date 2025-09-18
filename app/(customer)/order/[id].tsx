import { Screen } from "@/components/shared/screen";
import { useOrder } from "@/hooks/use-order";
import { useTheme } from "@/hooks/use-theme";
import { Order } from "@/models/order";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Typography } from "@/components/shared/typography";
import MapView, { Marker } from "react-native-maps";
import { OrderProductLine } from "@/models/order";

const OrderProductLineRow = ({ item }: { item: OrderProductLine }) => {
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: sizes.padding,
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
      <View style={styles.infoContainer}>
        <Typography variant="h4">
          {item.quantity}x {item.product.name}
        </Typography>
        <Typography style={styles.description} numberOfLines={1}>
          {item.selectedToppings?.map((t) => t.name).join(", ")}
        </Typography>
      </View>
      <Typography variant="h4" style={styles.price}>
        ${(item.totalPrice).toFixed(2)}
      </Typography>
    </View>
  );
};

export default function OrderTrackingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getOrderById } = useOrder();
  const [order, setOrder] = useState<Order | null>(null);
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;

  useEffect(() => {
    if (id) {
      getOrderById(id).then(setOrder);
    }
  }, [id, getOrderById]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: sizes.padding,
    },
    map: {
      height: 300,
      borderRadius: sizes.borderRadius,
      overflow: "hidden",
      marginBottom: sizes.padding,
    },
    title: {
      marginBottom: sizes.padding,
    },
    section: {
      marginBottom: sizes.padding,
    },
    sectionTitle: {
      textTransform: "uppercase",
      color: colors.gray,
      marginBottom: sizes.base,
    },
    summaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: sizes.base,
    },
  });

  if (!order) {
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
          Order #{order.id.substring(0, 8)}
        </Typography>

        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Delivery Status
          </Typography>
          <Typography>{order.status}</Typography>
        </View>

        {order.deliveringAddress && (
          <>
            <View style={styles.section}>
              <Typography variant="h3" style={styles.sectionTitle}>
                Delivery Address
              </Typography>
              <Typography>
                {order.deliveringAddress.area}, {order.deliveringAddress.city}
              </Typography>
            </View>

            <MapView
              style={styles.map}
              initialRegion={{
                latitude: order.deliveringAddress.latitude,
                longitude: order.deliveringAddress.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: order.deliveringAddress.latitude,
                  longitude: order.deliveringAddress.longitude,
                }}
              />
            </MapView>
          </>
        )}

        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Order Summary
          </Typography>
          {order.productLines.map((item) => (
            <OrderProductLineRow item={item} key={item.id} />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.summaryRow}>
            <Typography>Delivery Fee</Typography>
            <Typography>${order.deliveryFee.toFixed(2)}</Typography>
          </View>
          <View style={styles.summaryRow}>
            <Typography>Total</Typography>
            <Typography>${order.totalPrice.toFixed(2)}</Typography>
          </View>
        </View>
      </View>
    </Screen>
  );
}
