import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Screen } from "@/components/shared/screen";
import { Typography } from "@/components/shared/typography";
import { useAuth } from "@/hooks/use-auth";
import { useCustomer } from "@/hooks/use-customer";
import { useDeliverer } from "@/hooks/use-deliverer";
import { useTheme } from "@/hooks/use-theme";
import { customerService } from "@/services/customer-service";
import { delivererService } from "@/services/deliverer-service";
import { CommonActions } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function CompleteProfileScreen() {
  const { currentTheme } = useTheme();
  const { colors, fonts, sizes } = currentTheme;
  const {
    user,
    isLoading,
    refreshProfile,
    completeOnboarding,
    error,
    clearError,
  } = useAuth();
  const { updateCustomer } = useCustomer()
  const { updateDeliverer } = useDeliverer()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (error) {
      Alert.alert("Profile Error", error.message, [
        { text: "OK", onPress: () => clearError() },
      ]);
    }
  }, [clearError, error]);

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
      const { id, ...data } = commonData
      if (user.app_metadata.role === "customer") {
        // await customerService.createCustomer(commonData);
        await updateCustomer(id, data)
      } else if (user.app_metadata.role === "deliverer") {
        await updateDeliverer(id, {
          ...data,
          available: true, // Default value
          rate: 5, // Default value
        });
      }

      await completeOnboarding();
      await refreshProfile();
      // The root redirector will handle navigation
    } catch (error: any) {
      // This will be caught by the AuthContext, but we can also set it here
      // for services that don't throw AuthError specifically.
      Alert.alert("Profile Error", error.message || "An unknown error occurred.");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      gap: sizes.padding,
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
