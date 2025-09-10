import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { MOCK_CATEGORIES } from "@/constants/mock-data";
import { EstablishmentCard } from "@/components/customer/establishment-card";
import { EstablishmentType } from "@/models/enums";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useEstablishment } from "@/hooks/use-establishment";

export default function EstablishmentListScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: EstablishmentType }>();
  const [categoryName, setCategoryName] = useState("");
  const { currentTheme } = useTheme();
  const { sizes, colors } = currentTheme;
  const { getEstablishmentsByType, establishments, loading } =
    useEstablishment();

  const styles = StyleSheet.create({
    list: {
      paddingVertical: sizes.padding3,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  useEffect(() => {
    if (type) {
      getEstablishmentsByType(type);
      const category = MOCK_CATEGORIES.find((c) => c.type === type);
      setCategoryName(category?.name || "Establishments");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleEstablishmentPress = (id: string) => {
    router.push(`/(customer)/establishment/${id}?category=${categoryName}`);
  };

  if (loading) {
    return (
      <Screen style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </Screen>
    );
  }

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
