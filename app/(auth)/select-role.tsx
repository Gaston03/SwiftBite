import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { Screen } from '@/components/shared/screen';
import { useAuth } from '@/hooks/use-auth';

export default function SelectRoleScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;
  const { completeOnboarding } = useAuth();

  const handleRoleSelection = (role: 'customer' | 'deliverer') => {
    completeOnboarding();
    router.push(role === 'customer' ? '/(customer)/home' : '/(deliverer)/home');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: sizes.padding,
    },
    title: {
      ...fonts.h1,
      color: colors.text,
      marginBottom: sizes.padding2,
      textAlign: 'center',
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: sizes.padding,
      paddingHorizontal: sizes.padding * 2,
      borderRadius: sizes.radius,
      width: '100%',
      alignItems: 'center',
      marginBottom: sizes.padding,
    },
    buttonText: {
      ...fonts.h4,
      color: colors.black,
    },
  });

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>How do you want to use SwiftBite?</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleRoleSelection('customer')}>
          <Text style={styles.buttonText}>I'm a Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleRoleSelection('deliverer')}>
          <Text style={styles.buttonText}>I'm a Deliverer</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
