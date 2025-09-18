import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useTheme } from "@/hooks/use-theme";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

export default function RideTrackingScreen() {
  const { id } = useLocalSearchParams();
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: sizes.padding,
      alignItems: "center",
    },
    map: {
      height: "70%",
      width: "100%",
      marginBottom: sizes.padding,
    },
  });

  return (
    <Screen>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={styles.container}>
        <Typography variant="h2">Tracking Ride {id}</Typography>
        <Typography variant="h3" style={{ marginTop: sizes.padding }}>
          Status: EN_ROUTE_TO_PICKUP
        </Typography>
      </View>
    </Screen>
  );
}
