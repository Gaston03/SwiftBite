import { FlatList, StyleSheet, View } from "react-native";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { Input } from "@/components/shared/input";
import { MOCK_CATEGORIES } from "@/constants/mock-data";
import { CategoryButton } from "@/components/customer/category-button";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CustomerHomeScreen() {
  const router = useRouter();

  const handleCategoryPress = (type: string) => {
    router.push(`/(customer)/establishments/${type}`);
  };

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <View>
          <Typography variant="subtitle">Delivering to</Typography>
          <View style={styles.locationContainer}>
            <Typography variant="title" style={styles.locationText}>
              123 Ocean Drive
            </Typography>
            <Ionicons name="chevron-down" size={24} color="black" />
          </View>
        </View>
        <Ionicons name="notifications-outline" size={28} color="black" />
      </View>

      <Input
        placeholder="What are you looking for?"
        style={styles.searchBar}
      />

      <Typography variant="title" style={styles.sectionTitle}>
        Categories
      </Typography>

      <FlatList
        data={MOCK_CATEGORIES}
        renderItem={({ item }) => (
          <CategoryButton
            name={item.name}
            image={item.image}
            onPress={() => handleCategoryPress(item.type)}
          />
        )}
        keyExtractor={(item) => item.type}
        numColumns={3}
        columnWrapperStyle={styles.grid}
        contentContainerStyle={styles.gridContainer}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginRight: 4,
  },
  searchBar: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  grid: {
    justifyContent: "space-around",
  },
  gridContainer: {
    paddingBottom: 24,
  },
});
