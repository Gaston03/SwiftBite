import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartItem, useCart } from '@/contexts/cart-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';

type CartItemRowProps = {
  item: CartItem;
};

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateItemQuantity } = useCart();
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: sizes.padding,
      borderBottomWidth: 1,
      borderBottomColor: colors.tertiary,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: sizes.radius,
      marginRight: sizes.padding,
    },
    infoContainer: {
      flex: 1,
    },
    name: {
      ...fonts.h4,
      color: colors.text,
      marginBottom: sizes.base,
    },
    price: {
      ...fonts.body4,
      color: colors.gray,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityText: {
      ...fonts.h4,
      color: colors.text,
      marginHorizontal: sizes.padding,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.product.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{item.product.name}</Text>
        <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateItemQuantity(item.id, item.quantity - 1)}>
          <Ionicons name="remove-circle-outline" size={28} color={colors.gray} />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateItemQuantity(item.id, item.quantity + 1)}>
          <Ionicons name="add-circle" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
