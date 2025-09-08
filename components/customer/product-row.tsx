import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '@/models/product';
import { useTheme } from '@/hooks/use-theme';

type ProductRowProps = {
  product: Product;
  onPress: () => void;
};

export function ProductRow({ product, onPress }: ProductRowProps) {
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: sizes.padding,
      borderBottomWidth: 1,
      borderBottomColor: colors.tertiary,
    },
    infoContainer: {
      flex: 1,
      paddingRight: sizes.padding,
    },
    name: {
      ...fonts.h4,
      color: colors.text,
      marginBottom: sizes.base,
    },
    description: {
      ...fonts.body4,
      color: colors.gray,
      marginBottom: sizes.base,
    },
    price: {
      ...fonts.h4,
      color: colors.primary,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: sizes.radius * 2,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
      {product.imageUrl && (
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
      )}
    </TouchableOpacity>
  );
}
