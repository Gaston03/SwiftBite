import { Screen } from '@/components/shared/screen';
import { Button } from '@/components/shared/button';
import { useRouter } from 'expo-router';

export default function DelivererProfileScreen() {
  const router = useRouter();

  return (
    <Screen>
      <Button
        title="Switch to Customer"
        onPress={() => router.push('/(customer)/home')}
      />
    </Screen>
  );
}
