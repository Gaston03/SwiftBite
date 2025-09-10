import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { Product } from "@/models/product";
import { useEffect, useState } from "react";
import { ToppingRow } from "@/components/customer/topping-row";
import { Button } from "@/components/shared/button";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/contexts/cart-context";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/hooks/use-theme";
import { useProduct } from "@/hooks/use-product";
import { useTopping } from "@/hooks/use-topping";
import { useEstablishment } from "@/hooks/use-establishment";

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useCart();
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;
  const [product, setProduct] = useState<Product | null>(null);
  const [establishmentName, setEstablishmentName] = useState("Back");
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<
    Record<string, boolean>
  >({});
  const [totalPrice, setTotalPrice] = useState(0);
  const { getProductById, loading: productLoading } = useProduct();
  const {
    getToppingsByProductId,
    toppings,
    loading: toppingsLoading,
  } = useTopping();
  const { getEstablishmentById } = useEstablishment();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const foundProduct = await getProductById(id);
        setProduct(foundProduct);
        if (foundProduct) {
          setTotalPrice(foundProduct.price);
          getToppingsByProductId(foundProduct.id);
          const foundEstablishment = await getEstablishmentById(
            foundProduct.establishmentId
          );
          setEstablishmentName(foundEstablishment?.name || "Back");
        }
      };
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (product) {
      const updatedProduct: Product = {
        ...product,
        toppings: toppings || [],
      };
      setProduct(updatedProduct);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toppings]);

  useEffect(() => {
    if (product) {
      let newTotal = product.price * quantity;
      toppings.forEach((topping) => {
        if (selectedToppings[topping.id]) {
          newTotal += topping.price * quantity;
        }
      });
      setTotalPrice(newTotal);
    }
  }, [quantity, selectedToppings, product, toppings]);

  const handleToggleTopping = (toppingId: string) => {
    setSelectedToppings((prev) => ({ ...prev, [toppingId]: !prev[toppingId] }));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedToppings);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    }
  };

  const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    scrollContainer: { paddingBottom: 120 },
    headerImage: { width: "100%", height: 300 },
    infoContainer: { padding: sizes.padding },
    name: { ...fonts.h1, color: colors.text, marginBottom: sizes.base },
    description: { ...fonts.body3, color: colors.gray, lineHeight: 22 },
    toppingsContainer: {
      paddingHorizontal: sizes.padding,
      marginTop: sizes.padding,
    },
    sectionTitle: {
      ...fonts.h2,
      color: colors.text,
      marginBottom: sizes.base,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      padding: sizes.padding,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.tertiary,
    },
    quantityContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: sizes.padding,
    },
    quantityText: {
      ...fonts.h2,
      color: colors.text,
      marginHorizontal: sizes.padding,
    },
    cartButton: {
      flex: 1,
    },
  });

  if (productLoading) {
    return (
      <Screen style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </Screen>
    );
  }

  if (!product) {
    return (
      <Screen style={styles.center}>
        <Typography>Product not found.</Typography>
      </Screen>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Screen scrollable withPadding={false}>
        <Stack.Screen
          options={{
            title: product.name,
            headerBackTitle: establishmentName,
          }}
        />
        <Image source={{ uri: product.url }} style={styles.headerImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {toppingsLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          toppings.length > 0 && (
            <View style={styles.toppingsContainer}>
              <Text style={styles.sectionTitle}>Add-ons</Text>
              {toppings.map((topping) => (
                <ToppingRow
                  key={topping.id}
                  name={topping.name}
                  price={topping.price}
                  isSelected={!!selectedToppings[topping.id]}
                  onValueChange={() => handleToggleTopping(topping.id)}
                />
              ))}
            </View>
          )
        )}
      </Screen>
      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Ionicons
              name="remove-circle-outline"
              size={32}
              color={colors.gray}
            />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity((q) => q + 1)}>
            <Ionicons name="add-circle" size={32} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Button
          title={`Add - $${totalPrice.toFixed(2)}`}
          onPress={handleAddToCart}
          style={styles.cartButton}
        />
      </View>
    </View>
  );
}
