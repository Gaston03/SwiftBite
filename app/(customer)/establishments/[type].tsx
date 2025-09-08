import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { FlatList, View, StyleSheet } from "react-native";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { MOCK_ESTABLISHMENTS, MOCK_CATEGORIES } from "@/constants/mock-data";
import { EstablishmentCard } from "@/components/customer/establishment-card";
import { EstablishmentType } from "@/models/enums";
import { useEffect, useState } from "react";
import { Establishment } from "@/models/establishment";

export default function EstablishmentListScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: EstablishmentType }>();
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (type) {
      const filtered = MOCK_ESTABLISHMENTS.filter((e) => e.type === type);
      setEstablishments(filtered);

      const category = MOCK_CATEGORIES.find((c) => c.type === type);
      setCategoryName(category?.name || "Establishments");
    }
  }, [type]);

  const handleEstablishmentPress = (id: string) => {
    router.push(`/(customer)/establishment/${id}?category=${categoryName}`);
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          title: categoryName ? `Explore ${categoryName}` : "Establishments",
          headerBackTitle: "Home",
        }}
      />
      {establishments.length > 0 ? (
        <FlatList
          data={establishments}
          renderItem={({ item }) => (
            <EstablishmentCard
              establishment={item}
              onPress={() => handleEstablishmentPress(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Typography>No establishments found for this category.</Typography>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
