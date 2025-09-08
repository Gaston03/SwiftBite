import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';

export default function CustomerLayout() {
  const { currentTheme } = useTheme();
  const { colors, fonts } = currentTheme;

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          ...fonts.h3,
          color: colors.text,
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
