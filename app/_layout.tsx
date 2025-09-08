import { EstablishmentProvider } from '@/contexts/establishment-context';
import { CartProvider } from '@/contexts/cart-context';
import { Stack } from 'expo-router';

export default function RootLayout() {
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
