import { AppRouter } from "@/components/shared/app-router";
import { AddressProvider } from "@/contexts/address-context";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { CustomerProvider } from "@/contexts/customer-context";
import { DelivererProvider } from "@/contexts/deliverer-context";
import { ErrorProvider } from "@/contexts/error-context";
import { EstablishmentProvider } from "@/contexts/establishment-context";
import { OrderProvider } from "@/contexts/order-context";
import { PaymentMethodProvider } from "@/contexts/payment-method-context";
import { ProductProvider } from "@/contexts/product-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { ToppingProvider } from "@/contexts/topping-context";
import { Stack } from "expo-router";
import "react-native-get-random-values";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
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
                          <PaymentMethodProvider>
                            <OrderProvider>
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
                            </OrderProvider>
                          </PaymentMethodProvider>
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
    </SafeAreaProvider>
  );
}
