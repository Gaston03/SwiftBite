import { useAuth } from "@/hooks/use-auth";
import { useOrder } from "@/hooks/use-order";
import { useTheme } from "@/hooks/use-theme";
import { OrderStatus } from "@/models/enums";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

export default function CustomerLayout() {
  const { currentTheme } = useTheme();
  const { colors, fonts } = currentTheme;
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { orders, loading: areOrdersLoading } = useOrder();

  const activeOrder = orders.find(
    (order) =>
      order.status !== OrderStatus.DELIVERED &&
      order.status !== OrderStatus.CANCELLED &&
      order.status !== OrderStatus.REFUSED
  );

  if (isAuthLoading || areOrdersLoading) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  if (activeOrder) {
    return <Redirect href={`/(customer)/order/${activeOrder.id}`} />;
  }

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerTintColor: colors.text,
        title: "",
        headerTitleStyle: {
          ...fonts.h3,
          color: colors.text,
        },
        headerBackground: () => (
          <View style={{ flex: 1, backgroundColor: colors.background }} />
        ),
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="establishments/[type]"
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="establishment/[id]"
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen name="product/[id]" options={{ headerBackTitle: "Back" }} />
    </Stack>
  );
}
