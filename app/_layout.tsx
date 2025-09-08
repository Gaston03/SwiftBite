import { EstablishmentProvider } from '@/contexts/establishment-context';
import { CartProvider } from '@/contexts/cart-context';
import { Stack } from 'expo-router';
import { SplashScreen } from '@/components/shared/SplashScreen';
import { useState, useEffect, useContext } from 'react';
import { ThemeProvider, ThemeContext } from '@/contexts/theme-context';

function App() {
  const [isAppReady, setAppReady] = useState(false);
  const { isThemeLoading } = useContext(ThemeContext);

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
        <Stack>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(customer)" options={{ headerShown: false }} />
          <Stack.Screen name="(deliverer)" options={{ headerShown: false }} />
        </Stack>
      </EstablishmentProvider>
    </CartProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
