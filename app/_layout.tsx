import { AppRouter } from "@/components/shared/app-router";
import { AddressProvider } from "@/contexts/address-context";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { CustomerProvider } from "@/contexts/customer-context";
import { DelivererProvider } from "@/contexts/deliverer-context";
import { ErrorProvider } from "@/contexts/error-context";
import { EstablishmentProvider } from "@/contexts/establishment-context";
import { ProductProvider } from "@/contexts/product-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { ToppingProvider } from "@/contexts/topping-context";
import { Stack } from "expo-router";
import "react-native-get-random-values";

export default function RootLayout() {
  return (
    <ErrorProvider>
      <ThemeProvider>
        <AuthProvider>
          <CustomerProvider>
            <DelivererProvider>
              <AddressProvider>
                <CartProvider>
                  <EstablishmentProvider>
                    <ProductProvider>
                      <ToppingProvider>
                        <AppRouter>
                          <Stack>
                            <Stack.Screen
                              name="(onboarding)"
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="(auth)"
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="(customer)"
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="(deliverer)"
                              options={{ headerShown: false }}
                            />
                          </Stack>
                        </AppRouter>
                      </ToppingProvider>
                    </ProductProvider>
                  </EstablishmentProvider>
                </CartProvider>
              </AddressProvider>
            </DelivererProvider>
          </CustomerProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorProvider>
  );
}
