import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '@/models/product';

type ProductRowProps = {
  product: Product;
  onPress: () => void;
};

export function ProductRow({ product, onPress }: ProductRowProps) {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  infoContainer: {
    flex: 1,
    paddingRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
});
