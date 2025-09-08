import { Stack } from 'expo-router';

export default function CustomerLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="establishments/[type]" options={{ headerBackTitle: "Back" }} />
      <Stack.Screen name="establishment/[id]" options={{ headerBackTitle: "Back" }} />
      <Stack.Screen name="product/[id]" options={{ headerBackTitle: "Back" }} />
    </Stack>
  );
}
