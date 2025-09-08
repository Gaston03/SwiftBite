import { Stack } from 'expo-router';
import { COLORS, FONTS } from '@/constants/theme';

export default function CustomerLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.secondary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          ...FONTS.h3,
          color: COLORS.white,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="establishments/[type]" options={{ headerBackTitle: 'Back' }} />
      <Stack.Screen name="establishment/[id]" options={{ headerBackTitle: 'Back' }} />
      <Stack.Screen name="product/[id]" options={{ headerBackTitle: 'Back' }} />
    </Stack>
  );
}
