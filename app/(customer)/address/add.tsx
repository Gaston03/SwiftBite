import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useUser } from "@/hooks/use-user";
import { useTheme } from "@/hooks/use-theme";
import { Address } from "@/models/address";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function AddAddressScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  const { sizes } = currentTheme;
  const { createAddress, loading, customer } = useUser();
  const [address, setAddress] = useState({
    city: "",
    area: "",
    zipCode: "",
    instructions: "",
  });

  const styles = StyleSheet.create({
    form: {
      flex: 1,
      padding: sizes.padding,
      gap: sizes.padding,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: "flex-end",
    },
  });

  const handleAddAddress = async () => {
    if (!customer) return;

    const newAddress: Omit<Address, "id"> = {
      ...address,
      latitude: 0, // Mocked for now
      longitude: 0, // Mocked for now
      customerId: customer.id,
    };
    await createAddress(newAddress);
    router.back();
  };

  return (
    <Screen>
      <View style={styles.form}>
        <Typography variant="h2">Add a new address</Typography>
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
            title="Add Address"
            onPress={handleAddAddress}
            variant="primary"
            loading={loading}
          />
        </View>
      </View>
    </Screen>
  );
}
