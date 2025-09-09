import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';

export default function AuthLayout() {
  const { currentTheme } = useTheme();
  const { colors, fonts } = currentTheme;

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerTintColor: colors.text,
        headerTitleStyle: {
          ...fonts.h3,
          color: colors.text,
        },
      }}
    >
      <Stack.Screen name="select-role" options={{ title: 'Select Role' }} />
    </Stack>
  );
}
