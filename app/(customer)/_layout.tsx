import { Stack } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { View } from "react-native";
import { CustomerProvider } from "@/contexts/customer-context";

export default function CustomerLayout() {
  const { currentTheme } = useTheme();
  const { colors, fonts } = currentTheme;

  return (
    <CustomerProvider>
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
          options={{ headerBackTitle: "Back" }}
        />
        <Stack.Screen
          name="establishment/[id]"
          options={{ headerBackTitle: "Back" }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{ headerBackTitle: "Back" }}
        />
      </Stack>
    </CustomerProvider>
  );
}
