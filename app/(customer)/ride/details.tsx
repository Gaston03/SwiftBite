import { Button } from "@/components/shared/button";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useRide } from "@/hooks/use-ride";
import { useTheme } from "@/hooks/use-theme";
import { VehicleType } from "@/models/enums";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAuth } from "@/hooks/use-auth";

const RIDE_OPTIONS = [
  {
    type: VehicleType.MOTORCYCLE,
    name: "Moto",
    price: 5.0,
    icon: "bicycle",
  },
  {
    type: VehicleType.CAR,
    name: "Car",
    price: 10.0,
    icon: "car-sport",
  },
];

export default function RideDetailsScreen() {
  const { currentTheme } = useTheme();
  const { colors, sizes, fonts } = currentTheme;
  const router = useRouter();
  const { createRide } = useRide();
  const { userProfile } = useAuth();
  const params = useLocalSearchParams<{
    originLatitude: string;
    originLongitude: string;
    originDescription: string;
    destinationLatitude: string;
    destinationLongitude: string;
    destinationDescription: string;
  }>();
  const [selectedRide, setSelectedRide] = useState<VehicleType | null>(null);

  const origin = {
    latitude: parseFloat(params.originLatitude),
    longitude: parseFloat(params.originLongitude),
    description: params.originDescription,
  };

  const destination = {
    latitude: parseFloat(params.destinationLatitude),
    longitude: parseFloat(params.destinationLongitude),
    description: params.destinationDescription,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    bottomContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.background,
      padding: sizes.padding,
      borderTopLeftRadius: sizes.radius,
      borderTopRightRadius: sizes.radius,
    },
    itemContainer: {
      alignItems: "center",
      marginRight: sizes.padding,
      padding: sizes.padding,
      borderRadius: sizes.radius,
    },
    selectedItem: {
      backgroundColor: colors.primary,
    },
  });

  const handleRequestRide = async () => {
    if (!selectedRide || !userProfile || !origin || !destination) return;

    const rideOption = RIDE_OPTIONS.find((r) => r.type === selectedRide);
    if (!rideOption) return;

    const newRide = await createRide({
      customerId: userProfile.id,
      vehicleType: selectedRide,
      originLatitude: origin.latitude,
      originLongitude: origin.longitude,
      originDescription: origin.description,
      destinationLatitude: destination.latitude,
      destinationLongitude: destination.longitude,
      destinationDescription: destination.description,
      price: rideOption.price,
    });

    if (newRide) {
      router.push(`/(customer)/ride/${newRide.id}`);
    }
  };

  return (
    <Screen withPadding={false}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={
            origin
              ? {
                  latitude: origin.latitude,
                  longitude: origin.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              : undefined
          }
        >
          {origin && <Marker coordinate={origin} title="Origin" />}
          {destination && (
            <Marker coordinate={destination} title="Destination" />
          )}
        </MapView>
        <View style={styles.bottomContainer}>
          <FlatList
            data={RIDE_OPTIONS}
            keyExtractor={(item) => item.type}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.itemContainer,
                  selectedRide === item.type && styles.selectedItem,
                ]}
                onPress={() => setSelectedRide(item.type)}
              >
                <Ionicons name={item.icon as any} size={40} color={selectedRide === item.type ? colors.white : colors.text} />
                <Typography variant="h3" style={{color: selectedRide === item.type ? colors.white : colors.text}}>{item.name}</Typography>
                <Typography style={{color: selectedRide === item.type ? colors.white : colors.text}}>${item.price.toFixed(2)}</Typography>
              </TouchableOpacity>
            )}
          />
          <Button
            title="Request Ride"
            onPress={handleRequestRide}
            disabled={!selectedRide}
            style={{ marginTop: sizes.padding }}
          />
        </View>
      </View>
    </Screen>
  );
}
