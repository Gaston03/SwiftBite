import { EstablishmentProvider } from '@/contexts/establishment-context';
import { CartProvider } from '@/contexts/cart-context';
import { Stack } from 'expo-router';
import { SplashScreen } from '@/components/shared/SplashScreen';
import { useState, useEffect } from 'react';

export default function RootLayout() {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simulate a delay for the splash screen
    setTimeout(() => {
      setAppReady(true);
    }, 3000); // 3 seconds
  }, []);

  if (!isAppReady) {
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
