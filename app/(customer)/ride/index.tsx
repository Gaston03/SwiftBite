import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { useRouter } from "expo-router";

export default function RideScreen() {
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;
  const router = useRouter();

  const styles = StyleSheet.create({
    map: {
      height: "60%",
      width: "100%",
    },
    container: {
      flex: 1,
      padding: sizes.padding,
    },
    input: {
      marginBottom: sizes.base,
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
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Your Location"
        />
      </MapView>
      <View style={styles.container}>
        <Typography variant="h2" style={{ marginBottom: sizes.padding }}>
          Where to?
        </Typography>
        <Input placeholder="From" style={styles.input} />
        <Input placeholder="To" style={styles.input} />
        <Button
          title="Find Ride"
          onPress={() => router.push("/(customer)/ride/details")}
        />
      </View>
    </Screen>
  );
}
