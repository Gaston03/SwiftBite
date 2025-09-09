import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { Screen } from "@/components/shared/screen";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect } from "react";
import { Typography } from "@/components/shared/typography";
import { customerService } from "@/services/customer-service";
import { delivererService } from "@/services/deliverer-service";

export default function CompleteProfileScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;
  const { user, isLoading, refreshProfile, completeOnboarding } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (user?.app_metadata.name) {
      const nameParts = user.app_metadata.name.split(" ");
      setFirstName(nameParts[0]);
      if (nameParts.length > 1) {
        setLastName(nameParts.slice(1).join(" "));
      }
    }
  }, [user]);

  const handleCompleteProfile = async () => {
    if (!user || !user.email || !user.app_metadata.role) {
      console.error("User data is missing.");
      return;
    }

    try {
      const commonData = {
        id: user.id,
        email: user.email,
        firstName,
        lastName,
        countryCode,
        phoneNumber,
        role: user.app_metadata.role,
      };

      if (user.app_metadata.role === "customer") {
        await customerService.createCustomer(commonData);
      } else if (user.app_metadata.role === "deliverer") {
        await delivererService.createDeliverer({
          ...commonData,
          available: true, // Default value
          rate: 5, // Default value
        });
      }

      await completeOnboarding();
      await refreshProfile();
      // The root redirector will handle navigation
    } catch (error) {
      console.error("Failed to complete profile:", error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: sizes.padding,
    },
    title: {
      ...fonts.h1,
      color: colors.text,
      textAlign: "center",
      marginBottom: sizes.padding * 2,
    },
    input: {
      marginBottom: sizes.padding,
    },
    button: {
      marginTop: sizes.padding,
    },
  });

  return (
    <Screen>
      <View style={styles.container}>
        <Typography style={styles.title}>Complete Your Profile</Typography>
        <Input
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Input
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <Input
          style={styles.input}
          placeholder="Country Code (e.g., +1)"
          value={countryCode}
          onChangeText={setCountryCode}
          keyboardType="phone-pad"
        />
        <Input
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <Button
          style={styles.button}
          title="Save and Continue"
          onPress={handleCompleteProfile}
          disabled={isLoading}
        />
      </View>
    </Screen>
  );
}
