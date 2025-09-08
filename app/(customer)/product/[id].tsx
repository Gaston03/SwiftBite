import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { MOCK_PRODUCTS } from "@/constants/mock-data";
import { Product } from "@/models/product";
import { useEffect, useState } from "react";
import { ToppingRow } from "@/components/customer/topping-row";
import { Button } from "@/components/shared/button";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/contexts/cart-context";
import * as Haptics from 'expo-haptics';

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<Record<string, boolean>>({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (id) {
      const foundProduct = MOCK_PRODUCTS.find((p) => p.id === id);
      setProduct(foundProduct || null);
      if (foundProduct) {
        setTotalPrice(foundProduct.price);
      }
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      let newTotal = product.price * quantity;
      product.toppings?.forEach(topping => {
        if (selectedToppings[topping.id]) {
          newTotal += topping.price * quantity;
        }
      });
      setTotalPrice(newTotal);
    }
  }, [quantity, selectedToppings, product]);

  const handleToggleTopping = (toppingId: string) => {
    setSelectedToppings(prev => ({ ...prev, [toppingId]: !prev[toppingId] }));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedToppings);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    }
  };

  if (!product) {
    return (
      <Screen style={styles.center}>
        <Typography>Product not found.</Typography>
      </Screen>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: product.name, headerBackTitle: "Back" }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.headerImage} />
        <View style={styles.infoContainer}>
          <Typography variant="title" style={styles.name}>{product.name}</Typography>
          <Typography style={styles.description}>{product.description}</Typography>
        </View>

        {product.toppings && product.toppings.length > 0 && (
          <View style={styles.toppingsContainer}>
            <Typography variant="subtitle" style={styles.sectionTitle}>Add-ons</Typography>
            {product.toppings.map(topping => (
              <ToppingRow
                key={topping.id}
                name={topping.name}
                price={topping.price}
                isSelected={!!selectedToppings[topping.id]}
                onValueChange={() => handleToggleTopping(topping.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))}>
            <Ionicons name="remove-circle-outline" size={32} color="#333" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(q => q + 1)}>
            <Ionicons name="add-circle" size={32} color="#FF6347" />
          </TouchableOpacity>
        </View>
        <Button
          title={`Add to Cart - $${totalPrice.toFixed(2)}`}
          onPress={handleAddToCart}
          style={styles.cartButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  scrollContainer: { paddingBottom: 120 }, // Padding for the sticky footer
  headerImage: { width: "100%", height: 300 },
  infoContainer: { padding: 16 },
  name: { marginBottom: 8 },
  description: { color: '#666', lineHeight: 22 },
  toppingsContainer: { paddingHorizontal: 16, marginTop: 16 },
  sectionTitle: { marginBottom: 8 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  cartButton: {
    flex: 1,
  },
});
