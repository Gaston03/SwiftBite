import { Button } from "@/components/shared/button";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useAuth } from "@/hooks/use-auth";
import { useRide } from "@/hooks/use-ride";
import { useTheme } from "@/hooks/use-theme";
import { VehicleType } from "@/models/enums";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

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
  const [selectedRide, setSelectedRide] = useState<VehicleType | null>(null);

  const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: sizes.padding,
      borderBottomWidth: 1,
      borderBottomColor: colors.card,
    },
    selectedItem: {
      backgroundColor: colors.primary,
    },
    iconContainer: {
      marginRight: sizes.padding,
    },
    detailsContainer: {
      flex: 1,
    },
    price: {
      ...fonts.h3,
    },
    buttonContainer: {
      padding: sizes.padding,
    },
  });

  const handleRequestRide = async () => {
    if (!selectedRide || !userProfile) return;

    const rideOption = RIDE_OPTIONS.find((r) => r.type === selectedRide);
    if (!rideOption) return;

    const newRide = await createRide({
      customerId: userProfile.id,
      vehicleType: selectedRide,
      // These are placeholders, you should get them from the previous screen
      originAddressId: "f5b3b3b3-3b3b-3b3b-3b3b-3b3b3b3b3b3b",
      destinationAddressId: "f5b3b3b3-3b3b-3b3b-3b3b-3b3b3b3b3b3b",
      price: rideOption.price,
    });

    if (newRide) {
      router.push(`/(customer)/ride/${newRide.id}`);
    }
  };

  return (
    <Screen>
      <FlatList
        data={RIDE_OPTIONS}
        keyExtractor={(item) => item.type}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.itemContainer,
              selectedRide === item.type && styles.selectedItem,
            ]}
            onPress={() => setSelectedRide(item.type)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon as any} size={40} color={selectedRide === item.type ? colors.white : colors.text} />
            </View>
            <View style={styles.detailsContainer}>
              <Typography variant="h3" style={{color: selectedRide === item.type ? colors.white : colors.text}}>{item.name}</Typography>
            </View>
            <Typography style={{...styles.price, color: selectedRide === item.type ? colors.white : colors.text}}>${item.price.toFixed(2)}</Typography>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Request Ride"
          onPress={handleRequestRide}
          disabled={!selectedRide}
        />
      </View>
    </Screen>
  );
}
