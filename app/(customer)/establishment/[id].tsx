import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { View, StyleSheet, SectionList, Image, Text } from "react-native";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { MOCK_ESTABLISHMENTS } from "@/constants/mock-data";
import { Establishment } from "@/models/establishment";
import { useEffect, useState } from "react";
import { ProductRow } from "@/components/customer/product-row";
import { Product } from "@/models/product";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/use-theme";

type ProductSection = {
  title: string;
  data: Product[];
};

export default function EstablishmentDetailsScreen() {
  const router = useRouter();
  const { id, category } = useLocalSearchParams<{ id: string, category?: string }>();
  const [establishment, setEstablishment] = useState<Establishment | null>(null);
  const [productSections, setProductSections] = useState<ProductSection[]>([]);

  const { currentTheme } = useTheme()
  const { sizes, colors, fonts } = currentTheme

  const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    list: {
      paddingBottom: sizes.padding3,
    },
    headerImage: {
      paddingTop: sizes.padding3,
      width: "100%",
      height: 200,
    },
    infoContainer: {
      padding: sizes.padding,
      ...fonts.h4,
      color: colors.text
    },
    name: {
      marginBottom: 8,
      ...fonts.h4,
      color: colors.text
    },
    detailsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    rating: {
      ...fonts.h4,
      color: colors.text
    },
    dot: {
      marginHorizontal: 6,
      ...fonts.h4,
      color: colors.text
    },
    deliveryTime: {
      ...fonts.h4,
      color: colors.text
    },
    sectionHeader: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: "#f7f7f7",
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: "#eee",
    },
  });

  useEffect(() => {
    if (id) {
      const foundEstablishment = MOCK_ESTABLISHMENTS.find((e) => e.id === id);
      setEstablishment(foundEstablishment || null);

      if (foundEstablishment && foundEstablishment.products) {
        const groupedProducts = foundEstablishment.products.reduce(
          (acc, product) => {
            const category = product.category || "Other";
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(product);
            return acc;
          },
          {} as Record<string, Product[]>
        );

        const sections = Object.keys(groupedProducts).map((title) => ({
          title,
          data: groupedProducts[title],
        }));
        setProductSections(sections);
      }
    }
  }, [id]);

  const handleProductPress = (productId: string) => {
    router.push(`/(customer)/product/${productId}`);
  };

  if (!establishment) {
    return (
      <Screen style={styles.center}>
        <Typography>Establishment not found.</Typography>
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen
        options={{
          title: establishment.name,
          headerBackTitle: "Back",
        }}
      />
      <SectionList
        sections={productSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductRow product={item} onPress={() => handleProductPress(item.id)} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Typography variant="h2" style={styles.sectionHeader}>
            {title}
          </Typography>
        )}
        ListHeaderComponent={
          <View>
            <Image
              source={{ uri: establishment.imageUrl }}
              style={styles.headerImage}
            />
            <View style={styles.infoContainer}>
              <Typography variant="h1" style={styles.name}>
                {establishment.name}
              </Typography>
              <View style={styles.detailsContainer}>
                <Ionicons name="star" size={16} color="#FFC107" />
                <Text style={styles.rating}>{establishment.rate}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.deliveryTime}>
                  {establishment.deliveryTime}
                </Text>
              </View>
            </View>
          </View>
        }
        contentContainerStyle={styles.list}
      />
    </Screen>
  );
}
