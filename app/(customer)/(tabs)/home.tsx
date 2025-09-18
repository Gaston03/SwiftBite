import CategoryCard from "@/components/customer/category-card";
import { EstablishmentCard } from "@/components/customer/establishment-card";
import { Input } from "@/components/shared/input";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { MOCK_CATEGORIES } from "@/constants/mock-data";
import { useEstablishment } from "@/hooks/use-establishment";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/shared/button";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useCustomer } from "@/hooks/use-customer";
import { useOrder } from "@/hooks/use-order";
import { OrderStatus } from "@/models/enums";

export default function CustomerHomeScreen() {
  const router = useRouter();
  const { theme, currentTheme, toggleTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;
  const { popularEstablishments, loading } = useEstablishment();
  const { customer } = useCustomer();
  const { orders } = useOrder();

  const activeOrder = orders.find(
    (order) =>
      order.status !== OrderStatus.DELIVERED &&
      order.status !== OrderStatus.CANCELLED &&
      order.status !== OrderStatus.REFUSED
  );

  const handleCategoryPress = (type: string) => {
    router.push(`/(customer)/establishments/${type}`);
  };

  const handleEstablishmentPress = (id: string) => {
    router.push(`/(customer)/establishment/${id}`);
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: sizes.padding,
    },
    locationContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    locationText: {
      ...fonts.h3,
      color: colors.text,
      marginRight: sizes.base,
    },
    searchBar: {
      marginBottom: sizes.padding2,
    },
    sectionTitle: {
      ...fonts.h2,
      color: colors.text,
      marginBottom: sizes.padding,
    },
    listContainer: {
      paddingBottom: sizes.padding,
    },
    themeToggleIcon: {
      ...fonts.h1,
      color: colors.text,
    },
    activeOrderBanner: {
      backgroundColor: colors.primary,
      padding: sizes.padding,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: sizes.radius,
      marginBottom: sizes.padding,
    },
    activeOrderText: {
      color: colors.white,
      fontWeight: "bold",
    },
  });

  return (
    <Screen scrollable>
      {activeOrder && (
        <Pressable
          onPress={() => router.push(`/(customer)/order/${activeOrder.id}`)}
        >
          <View style={styles.activeOrderBanner}>
            <Typography style={styles.activeOrderText}>
              You have an ongoing order. Tap to view.
            </Typography>
            <Ionicons name="arrow-forward" size={24} color={colors.white} />
          </View>
        </Pressable>
      )}
      <View style={styles.header}>
        <View>
          <Typography variant="body3" style={{ color: colors.gray }}>
            Delivering to
          </Typography>
          {customer?.address ? (
            <TouchableOpacity
              style={styles.locationContainer}
              onPress={() => router.push("/(customer)/address/update")}
            >
              <Typography variant="h3" style={styles.locationText}>
                {customer?.address?.city}, {customer?.address?.area}
              </Typography>
              <Ionicons
                name="chevron-forward-circle"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          ) : (
            <Button
              title="Add Address"
              onPress={() => router.push("/(customer)/address/add")}
            />
          )}
        </View>
        <Ionicons
          name={theme === "dark" ? "sunny" : "moon"}
          style={styles.themeToggleIcon}
          onPress={toggleTheme}
        />
      </View>

      <Input placeholder="What are you looking for?" style={styles.searchBar} />

      <Typography variant="h2" style={styles.sectionTitle}>
        Categories
      </Typography>

      <FlatList
        data={MOCK_CATEGORIES}
        renderItem={({ item, index }) => (
          <CategoryCard
            item={item}
            onPress={() => handleCategoryPress(item.type)}
            index={index}
          />
        )}
        keyExtractor={(item) => item.type}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      <Typography variant="h2" style={styles.sectionTitle}>
        Popular
      </Typography>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={popularEstablishments}
          renderItem={({ item }) => (
            <EstablishmentCard
              establishment={item}
              onPress={() => handleEstablishmentPress(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false} // To avoid nested scrollviews warning
        />
      )}
    </Screen>
  );
}
