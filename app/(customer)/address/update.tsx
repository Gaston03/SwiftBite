import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useAddress } from "@/hooks/use-address";
import { useCustomer } from "@/hooks/use-customer";
import { useTheme } from "@/hooks/use-theme";
import { Address } from "@/models/address";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function UpdateAddressScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  const { sizes } = currentTheme;
  const { customer } = useCustomer();
  const { loading, updateAddress } = useAddress();
  const [address, setAddress] = useState<Partial<Address>>({
    city: "",
    area: "",
    zipCode: "",
    instructions: "",
    latitude: -25.441105,
    longitude: -49.276352,
  });

  useEffect(() => {
    if (customer?.address) {
      setAddress(customer.address);
    }
  }, [customer]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    form: {
      flex: 1,
      padding: sizes.padding,
      gap: sizes.padding,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: "flex-end",
    },
    map: {
      height: 350,
      overflow: "hidden",
    },
  });

  const handleUpdateAddress = async () => {
    if (!customer?.address) return;

    await updateAddress(customer.address.id, address);

    router.back();
  };

  return (
    <Screen withPadding={false}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: address.latitude!,
            longitude: address.longitude!,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: address.latitude!,
              longitude: address.longitude!,
            }}
            draggable
            onDragEnd={(e) =>
              setAddress({
                ...address,
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              })
            }
          />
        </MapView>
        <View style={styles.form}>
          <Typography variant="h2">Update your address</Typography>
          <Input
            placeholder="City"
            value={address.city}
            onChangeText={(city) => setAddress({ ...address, city })}
          />
          <Input
            placeholder="Area"
            value={address.area}
            onChangeText={(area) => setAddress({ ...address, area })}
          />
          <Input
            placeholder="Zip Code"
            value={address.zipCode}
            onChangeText={(zipCode) => setAddress({ ...address, zipCode })}
          />
          <Input
            placeholder="Instructions (optional)"
            value={address.instructions}
            onChangeText={(instructions) =>
              setAddress({ ...address, instructions })
            }
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Update Address"
              onPress={handleUpdateAddress}
              variant="primary"
              loading={loading}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}
