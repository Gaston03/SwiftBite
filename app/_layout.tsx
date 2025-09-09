import { SplashScreen } from "@/components/shared/SplashScreen";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { EstablishmentProvider } from "@/contexts/establishment-context";
import { ProductProvider } from "@/contexts/product-context";
import { ThemeContext, ThemeProvider } from "@/contexts/theme-context";
import { ToppingProvider } from "@/contexts/topping-context";
import { useProtectedRoute } from "@/hooks/use-protected-route";
import { Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import "react-native-get-random-values";

function App() {
  const [isAppReady, setAppReady] = useState(false);
  const { isThemeLoading } = useContext(ThemeContext);
  useProtectedRoute();

  useEffect(() => {
    // Simulate a delay for the splash screen
    setTimeout(() => {
      setAppReady(true);
    }, 3000); // 3 seconds
  }, []);

  if (!isAppReady || isThemeLoading) {
    return <SplashScreen />;
  }

  return (
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
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  );
}
