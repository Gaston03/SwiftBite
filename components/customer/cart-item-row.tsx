import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartItem, useCart } from '@/contexts/cart-context';
import { Ionicons } from '@expo/vector-icons';

type CartItemRowProps = {
  item: CartItem;
};

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateItemQuantity } = useCart();

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.product.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{item.product.name}</Text>
        <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateItemQuantity(item.id, item.quantity - 1)}>
          <Ionicons name="remove-circle-outline" size={28} color="#666" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateItemQuantity(item.id, item.quantity + 1)}>
          <Ionicons name="add-circle" size={28} color="#FF6347" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
});
