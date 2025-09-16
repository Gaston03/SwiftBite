import { UserProvider } from "@/contexts/user-context";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

export default function CustomerLayout() {
  const { currentTheme } = useTheme();
  const { colors, fonts } = currentTheme;
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerTransparent: true,
          headerTintColor: colors.text,
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
          options={{ headerBackTitle: "Back", title: "Establishments" }}
        />
        <Stack.Screen
          name="establishment/[id]"
          options={{ headerBackTitle: "Back", title: "Establishment" }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{ headerBackTitle: "Back", title: "Product" }}
        />
        <Stack.Screen
          name="address/add"
          options={{ headerBackTitle: "Back", title: "Add Address" }}
        />
        <Stack.Screen
          name="profile/details"
          options={{ headerBackTitle: "Back", title: "My Details" }}
        />
        <Stack.Screen
          name="profile/payment-methods"
          options={{ headerBackTitle: "Back", title: "Payment Methods" }}
        />
        <Stack.Screen
          name="profile/add-payment-method"
          options={{ headerBackTitle: "Back", title: "Add Payment Method" }}
        />
      </Stack>
    </UserProvider>
  );
}
