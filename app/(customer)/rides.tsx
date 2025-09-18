import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useRide } from "@/hooks/use-ride";
import { useTheme } from "@/hooks/use-theme";
import { Ride } from "@/models/ride";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

export default function RidesScreen() {
  const { rides, loading } = useRide();
  const { currentTheme } = useTheme();
  const { colors, sizes, fonts } = currentTheme;

  const styles = StyleSheet.create({
    itemContainer: {
      padding: sizes.padding,
      borderBottomWidth: 1,
      borderBottomColor: colors.card,
    },
    itemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

  const renderItem = ({ item }: { item: Ride }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Typography variant="h3">
          To: {item.destinationAddress.city}
        </Typography>
        <Typography variant="h3">${item.price.toFixed(2)}</Typography>
      </View>
      <Typography variant="body2" style={{ color: colors.text }}>
        {new Date(item.createdAt).toLocaleDateString()} - {item.status}
      </Typography>
    </View>
  );

  return (
    <Screen>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={rides}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </Screen>
  );
}
