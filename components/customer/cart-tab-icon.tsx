import { useOrder } from '@/contexts/order-context';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type CartTabIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export function CartTabIcon({ focused, color, size }: CartTabIconProps) {
  const { itemCount } = useOrder();
  const { currentTheme } = useTheme();
  const { colors, fonts } = currentTheme;

  const styles = StyleSheet.create({
    container: {
      width: 24, // To match the other icons
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badge: {
      position: 'absolute',
      top: -5,
      right: -10,
      backgroundColor: colors.primary,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
      borderWidth: 1,
      borderColor: colors.background,
    },
    badgeText: {
      color: colors.white,
      ...fonts.body4,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <Ionicons name={focused ? 'cart' : 'cart-outline'} size={size} color={color} />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </View>
  );
}
