import { Screen } from "@/components/shared/screen";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { useRouter } from "expo-router";
import { Card } from "@/components/shared/card";
import { Typography } from "@/components/shared/typography";
import { Ionicons } from "@expo/vector-icons";

export default function RideScreen() {
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    bottomCard: {
      position: "absolute",
      bottom: sizes.padding,
      left: sizes.padding,
      right: sizes.padding,
    },
    whereToButton: {
      flexDirection: "row",
      alignItems: "center",
      padding: sizes.padding,
      backgroundColor: colors.card,
      borderRadius: sizes.radius,
      elevation: 5,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    iconContainer: {
      marginRight: sizes.padding,
    },
  });

  return (
    <Screen withPadding={false}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <Card style={styles.bottomCard}>
          <View style={styles.whereToButton}>
            <View style={styles.iconContainer}>
              <Ionicons name="search" size={24} color={colors.text} />
            </View>
            <Typography
              variant="h3"
              onPress={() => router.push("/(customer)/ride/search")}
            >
              Where to?
            </Typography>
          </View>
        </Card>
      </View>
    </Screen>
  );
}
