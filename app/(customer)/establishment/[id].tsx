import { ProductRow } from "@/components/customer/product-row";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useEstablishment } from "@/hooks/use-establishment";
import { useProduct } from "@/hooks/use-product";
import { useTheme } from "@/hooks/use-theme";
import { Establishment } from "@/models/establishment";
import { Product } from "@/models/product";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ProductSection = {
  title: string;
  data: Product[];
};

export default function EstablishmentDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [establishment, setEstablishment] = useState<Establishment | null>(
    null
  );
  const [productSections, setProductSections] = useState<ProductSection[]>([]);
  const { getEstablishmentById, loading: establishmentLoading } =
    useEstablishment();
  const {
    getEstablishmentProducts,
    products,
    loading: productsLoading,
  } = useProduct();

  const { currentTheme } = useTheme();
  const { sizes, colors, fonts } = currentTheme;

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
      color: colors.text,
    },
    name: {
      marginBottom: 8,
      ...fonts.h4,
      color: colors.text,
    },
    detailsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    rating: {
      ...fonts.h4,
      color: colors.text,
    },
    dot: {
      marginHorizontal: 6,
      ...fonts.h4,
      color: colors.text,
    },
    deliveryTime: {
      ...fonts.h4,
      color: colors.text,
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
      const fetchEstablishment = async () => {
        const foundEstablishment = await getEstablishmentById(id);
        setEstablishment(foundEstablishment);
        if (foundEstablishment) {
          getEstablishmentProducts(foundEstablishment.id);
        }
      };
      fetchEstablishment();
    }
  }, [getEstablishmentById, getEstablishmentProducts, id]);

  useEffect(() => {
    if (products) {
      const groupedProducts = products.reduce((acc, product) => {
        const category = product.category || "Other";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {} as Record<string, Product[]>);

      const sections = Object.keys(groupedProducts).map((title) => ({
        title,
        data: groupedProducts[title],
      }));
      setProductSections(sections);
    }
  }, [products]);

  const handleProductPress = (productId: string) => {
    router.push(`/(customer)/product/${productId}`);
  };

  if (establishmentLoading) {
    return (
      <Screen style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </Screen>
    );
  }

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
          <ProductRow
            product={item}
            onPress={() => handleProductPress(item.id)}
          />
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
        ListFooterComponent={
          productsLoading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : null
        }
        contentContainerStyle={styles.list}
      />
    </Screen>
  );
}
