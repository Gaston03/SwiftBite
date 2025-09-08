import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="select-role" options={{ title: 'Select Role' }} />
    </Stack>
  );
}
