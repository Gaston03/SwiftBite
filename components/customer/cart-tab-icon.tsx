import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '@/contexts/cart-context';

type CartTabIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export function CartTabIcon({ focused, color, size }: CartTabIconProps) {
  const { itemCount } = useCart();

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
    backgroundColor: '#FF6347',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
