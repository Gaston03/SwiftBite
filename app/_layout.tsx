import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { EstablishmentProvider } from "@/contexts/establishment-context";
import { ProductProvider } from "@/contexts/product-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { ToppingProvider } from "@/contexts/topping-context";
import { Stack } from "expo-router";
import "react-native-get-random-values";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <EstablishmentProvider>
            <ProductProvider>
              <ToppingProvider>
                <Stack>
                  <Stack.Screen
                    name="(onboarding)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="(customer)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(deliverer)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </ToppingProvider>
            </ProductProvider>
          </EstablishmentProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
