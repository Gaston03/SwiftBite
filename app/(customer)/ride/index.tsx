import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Button } from "@/components/shared/button";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Address } from "@/models/address";
import { AddressSelectionModal } from "@/components/customer/address-selection-modal";
import { useAddress } from "@/hooks/use-address";

export default function RideScreen() {
  const { currentTheme } = useTheme();
  const { colors, sizes } = currentTheme;
  const router = useRouter();
  const { addresses } = useAddress();
  const [modalVisible, setModalVisible] = useState(false);
  const [selecting, setSelecting] = useState<"origin" | "destination" | null>(
    null
  );
  const [origin, setOrigin] = useState<Address | null>(null);
  const [destination, setDestination] = useState<Address | null>(null);

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
      borderWidth: 1,
      borderColor: colors.border,
      padding: sizes.padding,
      borderRadius: sizes.radius,
    },
  });

  const handleSelectAddress = (address: Address) => {
    if (selecting === "origin") {
      setOrigin(address);
    } else {
      setDestination(address);
    }
    setModalVisible(false);
  };

  const handleFindRide = () => {
    if (origin && destination) {
      router.push({
        pathname: "/(customer)/ride/details",
        params: {
          originId: origin.id,
          destinationId: destination.id,
        },
      });
    }
  };

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
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
      </MapView>
      <View style={styles.container}>
        <Typography variant="h2" style={{ marginBottom: sizes.padding }}>
          Where to?
        </Typography>
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            setModalVisible(true);
            setSelecting("origin");
          }}
        >
          <Typography>{origin ? origin.area : "From"}</Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            setModalVisible(true);
            setSelecting("destination");
          }}
        >
          <Typography>{destination ? destination.area : "To"}</Typography>
        </TouchableOpacity>
        <Button
          title="Find Ride"
          onPress={handleFindRide}
          disabled={!origin || !destination}
        />
      </View>
      <AddressSelectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleSelectAddress}
        onAddAddress={() => router.push("/(customer)/address/add")}
        addresses={addresses}
      />
    </Screen>
  );
}
