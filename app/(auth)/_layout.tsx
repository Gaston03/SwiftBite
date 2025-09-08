import { Stack } from 'expo-router';
import { COLORS, FONTS } from '@/constants/theme';

export default function AuthLayout() {
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
      <Stack.Screen name="select-role" options={{ title: 'Select Role' }} />
    </Stack>
  );
}
